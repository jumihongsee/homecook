'use client';
import { use, useState } from 'react';
import styles from './boardNew.module.scss';
import { useRouter } from 'next/navigation';

export default function BoardNewUI(props) {
  const router = useRouter();

  const [ingredient, setIngredient] = useState([{ name: '', quantity: '', gram: '' }]);
  const [step, setStep] = useState([{ step: '' }]);
  const [title, setTitle] = useState('');
  const [thema, setThema] = useState('');
  const [time, setTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [script, setScripts] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [prevImg, setPrevImg] = useState('');
  const [imgFile, setImgFile] = useState(null); // 이미지 파일 저장 스테이트

  // delete button
  const [hoverIngredientIndex, setHoverIngredientIndex] = useState(null);
  const [hoverStepIndex, setHoverStepIndex] = useState(null);

  console.log(hoverStepIndex);

  // 유효성 검사 관련 상태
  const [titleAlert, setTitleAlert] = useState('');
  const [scriptAlert, setScriptAlert] = useState('');
  const [ingredientAlert, setIngredientAlert] = useState('');
  const [stepAlert, setStepAlert] = useState('');
  const [imgAlert, setImgAlert] = useState('');
  const [themaFocus, setThemaFocus] = useState(false);
  const [timeFocus, setTimeFocus] = useState(false);
  const [difficultyFocus, setDifficultyFocus] = useState(false);

  const addIngredient = () => {
    setIngredient([...ingredient, { name: '', quantity: '', gram: '' }]);
  };

  const addStep = () => {
    setStep([...step, { step: '' }]);
  };

  const updateIngredient = (index, field, value) => {
    const newList = [...ingredient];
    newList[index][field] = value;
    setIngredient(newList);
  };
  const deleteIngredient = hoverIngredientIndex => {
    const newList = [...ingredient];
    newList.splice(hoverIngredientIndex, 1);
    setIngredient(newList);
  };

  const updateStep = (index, field, value) => {
    const newList = [...step];
    newList[index][field] = value;
    setStep(newList);
  };

  const deleteStep = hoverStepIndex => {
    const newList = [...step];
    newList.splice(hoverStepIndex, 1);
    setStep(newList);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let hasError = false;
    let imgUrl = '';

    // 유효성 검사
    if (!title.trim()) {
      setTitleAlert('✔ 레시피 이름을 입력해주세요');
      hasError = true;
    } else {
      setTitleAlert('');
    }

    if (!script.trim()) {
      setScriptAlert('✔ 레시피 소개를 입력해주세요');
      hasError = true;
    } else {
      setScriptAlert('');
    }

    if (!thema) {
      setThemaFocus(true);
      hasError = true;
    } else {
      setThemaFocus(false);
    }

    if (!time) {
      setTimeFocus(true);
      hasError = true;
    } else {
      setTimeFocus(false);
    }

    if (!difficulty) {
      setDifficultyFocus(true);
      hasError = true;
    } else {
      setDifficultyFocus(false);
    }

    const emptyIngredient = ingredient.findIndex(
      item => !item.name.trim() || !item.quantity.trim() || !item.gram.trim()
    );
    if (emptyIngredient !== -1) {
      setIngredientAlert(`✔ ${emptyIngredient + 1} 번째 재료 정보를 모두 입력해 주세요`);
      hasError = true;
    } else {
      setIngredientAlert('');
    }

    const emptyStep = step.findIndex(item => !item.step.trim());
    if (emptyStep !== -1) {
      setStepAlert(`✔ ${emptyStep + 1} 번째 요리 순서 정보를 입력해 주세요`);
      hasError = true;
    } else {
      setStepAlert('');
    }

    if (!imgFile) {
      setImgAlert('✔ 이미지 등록은 필수 항목입니다.');
      hasError = true;
    } else {
      setImgAlert('');
    }

    if (hasError) return;

    // 이미지 업로드
    if (imgFile) {
      const fileName = encodeURIComponent(imgFile.name);
      const res = await fetch(`/api/recipe/image?file=${fileName}`);
      const s3Data = await res.json();

      const formData = new FormData();
      Object.entries({ ...s3Data.fields, file: imgFile }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const uploadResult = await fetch(s3Data.url, {
        method: 'POST',
        body: formData,
      });

      if (uploadResult.ok) {
        // setImgSrc(s3Data.url + '/' + fileName);
        imgUrl = s3Data.url + '/' + fileName;
      } else {
        alert('이미지 업로드 실패');
        return;
      }
    }
    console.log(imgUrl);

    const data = {
      ingredient,
      step,
      title,
      thema,
      time,
      difficulty,
      script,
      imgSrc: imgUrl,
      author: props.author,
      likes: 0,
    };

    await fetch('/api/recipe/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(async r => {
        if (r.ok) {
          const res = await r.json();
          const boardId = res.id;
          if (boardId) {
            router.push(`/board/detail/${boardId}`);
          }
        } else {
          // alert('레시피 등록 실패');
        }
      })
      .catch(err => {
        console.error('에러 발생:', err);
      });
  };

  return (
    <section className={styles.boardNew}>
      <div className={styles.title}>
        <h2>
          레시피등록
          <span>
            {'___'}님 만의 <strong>황금</strong> 레시피를 등록해 보세요
          </span>
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.recipe}>
          <div className={styles.recipeInfo}>
            <div className={styles.image}>
              <label className={styles.recipeImage} htmlFor="recipeImage">
                {prevImg ? (
                  <img className={styles.uploadImg} src={prevImg} />
                ) : (
                  <img src={'/board/camera.png'} />
                )}
              </label>
              <input
                type="file"
                accept="image/*"
                id="recipeImage"
                name="recipeImage"
                onChange={e => {
                  setImgAlert('');
                  const file = e.target.files[0];
                  if (file.size > 1024 * 1024) {
                    setImgAlert('✔ 이미지 용량은 1MB 이하만 가능합니다.');
                    e.target.value = '';
                    return;
                  }
                  const allowedTypes = ['image/jpeg', 'image/png'];
                  if (!allowedTypes.includes(file.type)) {
                    setImgAlert('✔ jpg 또는 png 파일만 업로드할 수 있습니다.');
                    e.target.value = '';
                    return;
                  }
                  setImgFile(file);
                  setPrevImg(URL.createObjectURL(file));
                }}
              />
              {imgAlert && <span className={styles.alert}>{imgAlert}</span>}
            </div>
            <div>
              <div>
                <label>
                  레시피 이름 {titleAlert && <span className={styles.alert}>{titleAlert}</span>}
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={e => {
                    setTitleAlert('');
                    setTitle(e.target.value);
                  }}
                  placeholder="예시) 초간단 콩나물국 끓이는 방법"
                />
              </div>
              <div className={styles.options}>
                <select
                  id="thema"
                  name="thema"
                  value={thema}
                  className={themaFocus ? styles.focus : ''}
                  onChange={e => {
                    setThema(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    테마별 선택
                  </option>
                  <option value="simple">간단요리</option>
                  <option value="diet">다이어트</option>
                  <option value="vegan">비건요리</option>
                  <option value="ramen">라면변신</option>
                  <option value="drink">혼술안주</option>
                </select>
                <select
                  id="time"
                  name="time"
                  value={time}
                  className={timeFocus ? styles.focus : ''}
                  onChange={e => {
                    setTimeFocus(false);
                    setTime(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    소요시간
                  </option>
                  <option value="10">10분내외</option>
                  <option value="20">20분내외</option>
                  <option value="30">30분내외</option>
                  <option value="60">60분내외</option>
                  <option value="120">120분내외</option>
                </select>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={difficulty}
                  className={difficultyFocus ? styles.focus : ''}
                  onChange={e => {
                    setDifficultyFocus(false);
                    setDifficulty(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    난이도
                  </option>
                  <option value="easy">쉬움</option>
                  <option value="normal">보통</option>
                  <option value="hard">어려움</option>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.recipeScript}>
            <label>
              레시피 소개
              {scriptAlert && <span className={styles.alert}>{scriptAlert}</span>}
            </label>
            <textarea
              name="script"
              placeholder="레시피에 대한 간단한 소개문구를 작성해 주세요"
              value={script}
              onChange={e => {
                setScriptAlert('');
                setScripts(e.target.value);
              }}
            />
          </div>
          <div className={styles.ingredient}>
            <label>재료 등록</label>
            <button onClick={addIngredient} type="button">
              + 추가
            </button>
            {ingredientAlert && <span className={styles.alert}>{ingredientAlert}</span>}
            {ingredient.map((item, index) => (
              <div
                key={index}
                className={`${styles.ingredientWrapper} ${hoverIngredientIndex === index ? styles.focus : ''}`}
                onMouseEnter={() => {
                  if (index === 0) return;
                  setHoverIngredientIndex(index);
                }}
                onMouseLeave={() => {
                  setHoverIngredientIndex(null);
                }}
              >
                {hoverIngredientIndex === index && ( // 마우스 오버한 인덱스와 현재 인덱스 값이 같을때 버튼 보여줌
                  <button
                    type="button"
                    className={styles.delete}
                    onClick={() => {
                      deleteIngredient(index);
                    }}
                  >
                    <img src="/board/close.png" />
                  </button>
                )}

                <input
                  type="text"
                  name="name"
                  placeholder="예시) 콩나물"
                  value={item.name}
                  onChange={e => {
                    setIngredientAlert('');
                    updateIngredient(index, 'name', e.target.value);
                  }}
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="수량정보"
                  value={item.quantity}
                  onChange={e => {
                    setIngredientAlert('');
                    updateIngredient(index, 'quantity', e.target.value);
                  }}
                />
                <input
                  type="number"
                  name="gram"
                  placeholder="단위(그램)"
                  value={item.gram}
                  onChange={e => {
                    setIngredientAlert('');
                    updateIngredient(index, 'gram', e.target.value);
                  }}
                />
              </div>
            ))}
          </div>
          <div className={styles.recipeStep}>
            <label>
              요리 순서
              {stepAlert && <span className={styles.alert}>{stepAlert}</span>}
            </label>
            {step.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => {
                  if (index === 0) return;
                  setHoverStepIndex(index);
                }}
                onMouseLeave={() => {
                  setHoverStepIndex(null);
                }}
              >
                {hoverStepIndex === index && (
                  <button
                    type="button"
                    className={styles.deleteStep}
                    onClick={() => {
                      deleteStep(index);
                    }}
                  >
                    <img src="/board/close.png" />
                  </button>
                )}

                <div className={styles.stepNumber}>{index + 1}</div>
                <textarea
                  name="step"
                  placeholder="예시) 콩나물을 물에 가볍게 씻어서 준비해 주세요."
                  value={item.step}
                  className={hoverStepIndex === index ? styles.focus : ''}
                  onChange={e => {
                    setStepAlert('');
                    updateStep(index, 'step', e.target.value);
                  }}
                />
              </div>
            ))}
            <button className={styles.addButton} onClick={addStep} type="button">
              + 순서 추가하기
            </button>
          </div>
          <button className={styles.submit} type="submit">
            레시피 등록
          </button>
        </div>
        <div className={styles.guide}>
          <h1>🍳 레시피 등록 가이드</h1>
          <p>
            나만의 황금 레시피, 지금 바로 등록해볼까요? 요리 이름을 적고, 대표 사진을 첨부해주세요.
          </p>
          <p>
            테마, 조리 시간, 난이도는 탭에서 골라주세요. 소개글엔 간단한 이야기나 팁을 적으면
            좋아요!
          </p>
          <p>
            재료는 이름, 양, 단위를 입력해 추가하고, 요리 순서는 단계별로 차근차근 작성해보세요.
          </p>
          <p>‘순서 추가하기’ 버튼으로 다음 단계도 쉽게 추가할 수 있어요. 👋</p>
        </div>
      </form>
    </section>
  );
}
