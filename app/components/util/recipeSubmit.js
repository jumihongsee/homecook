export async function RecipeSubmit({
  e,
  editBoardId,
  isEdit,
  editData,
  imgFile,
  ingredient,
  step,
  title,
  thema,
  time,
  difficulty,
  script,
  author,
  router,
  authorName,
  setTitleAlert,
  setScriptAlert,
  setThemaFocus,
  setTimeFocus,
  setDifficultyFocus,
  setIngredientAlert,
  setStepAlert,
  setImgAlert,
}) {
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
    item => !item.name.trim()
    // || !item.quantity.trim() || !item.gram.trim()
  );
  if (emptyIngredient !== -1) {
    setIngredientAlert(`✔ ${emptyIngredient + 1} 번째 재료 이름을 모두 입력해주세요`);
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

  if (!imgFile && !editData?.imgSrc) {
    setImgAlert('✔ 이미지 등록은 필수 항목입니다.');
    hasError = true;
  } else {
    setImgAlert('');
  }

  if (hasError) return;

  // ❇️ 분기 : 레시피 등록일 때
  if (!isEdit) {
    if (imgFile) {
      const fileName = encodeURIComponent(imgFile.name);
      const res = await fetch(`/api/recipe/image/new?file=${fileName}`);
      const s3Data = await res.json();

      const formData = new FormData();
      Object.entries({ ...s3Data.fields, file: imgFile }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const uploadResult = await fetch(s3Data.url, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResult.ok) {
        alert('이미지 업로드 실패');
        return;
      }

      imgUrl = `${s3Data.url}/${fileName}`;
    }

    const data = {
      ingredient,
      step,
      title,
      thema,
      time,
      difficulty,
      script,
      imgSrc: imgUrl,
      author,
      authorName,
      likes: 0,
      view: 0,
      createAt: new Date(),
    };

    const res = await fetch('/api/recipe/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const result = await res.json();
      router.push(`/board/detail/${result.id}`);
    }
  } else {
    // ❇️ 분기 : 레시피 수정일 때
    if (imgFile && editData?.imgSrc) {
      const key = editData.imgSrc.split('/').pop();
      await fetch('/api/recipe/image/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src: key }),
      });
    }

    if (imgFile) {
      // 이미지 파일이 수정이 되었을떄
      const fileName = encodeURIComponent(imgFile.name);
      const res = await fetch(`/api/recipe/image/new?file=${fileName}`);
      const s3Data = await res.json();

      const formData = new FormData();
      Object.entries({ ...s3Data.fields, file: imgFile }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const uploadResult = await fetch(s3Data.url, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResult.ok) {
        alert('이미지 업로드 실패');
        return;
      }

      imgUrl = `${s3Data.url}/${fileName}`;
    } else {
      // 레시피 수정이 아닐때는 기존 url 데이터에 넣음
      imgUrl = editData?.imgSrc;
    }

    const data = {
      ingredient,
      step,
      title,
      thema,
      time,
      difficulty,
      script,
      imgSrc: imgUrl,
      author: editData.author,
      authorName: editData.authorName,
      likes: editData.likes,
      updateAt: new Date(),
    };

    //레시피 데이터 수정
    const res = await fetch(`/api/recipe/edit?boardId=${editBoardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push(`/board/detail/${editBoardId}`);
    }
  }
}
