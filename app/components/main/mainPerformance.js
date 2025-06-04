'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './main.module.scss';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

gsap.registerPlugin(ScrollTrigger);

export default function MainPerformance() {
  const router = useRouter();
  const session = useSession();

  const [fixedTitle, setFixedTitle] = useState({
    MainTitle: '',
    subTitle: '',
    buttonUrl: '',
    buttonTitle: '',
  });

  const section03ImgArray = [
    {
      mainImg: '/main/section03_1_people.png',
      backImg: '/main/section03_1_bg.png',
      text: 'EASYCOOK',
    },
    {
      mainImg: '/main/section03_2_people.png',
      backImg: '/main/section03_1_bg.png',
      text: 'DIET',
    },
    {
      mainImg: '/main/section03_3_people.png',
      backImg: '/main/section03_1_bg.png',
      text: 'VEGAN',
    },
    {
      mainImg: '/main/section03_4_people.png',
      backImg: '/main/section03_1_bg.png',
      text: 'SOLOSNACK',
    },
  ];
  const headerRef = useRef(null);

  // section 1
  const circleRef = useRef(null);
  const wrapperRef = useRef(null);
  const titleRef = useRef(null);
  const mainRef = useRef(null);

  // section 2
  const textWrapperRef = useRef(null);
  const mainTextRef = useRef(null);
  const subTextRefs = useRef([]);

  // section 3
  const imgCardWrapperRef = useRef(null);
  const fixedTextRefs = useRef([]);
  const imgCardsRef = useRef(null);

  // section 4
  const writeWrapperRef = useRef(null);
  const writeImages = useRef([]);

  // section 5
  const joinWrapper = useRef(null);
  const imgSectionArray = useRef([]);

  const theme = {
    light: '#fff9d8',
    dark: '#ffa127',
  };

  // [공통함수] color Change
  const colorChange = (mode = 'dark') => {
    const bgColor = mode === 'dark' ? theme.dark : theme.light;
    const textColor = mode === 'dark' ? theme.light : theme.dark;

    gsap.to(mainRef.current, {
      backgroundColor: bgColor,
      color: textColor,
    });

    gsap.to(headerRef.current, {
      color: textColor,
    });
  };

  // [공통함수] fixed Text
  const fixedTextStatus = (visible = true) => {
    gsap.to(fixedTextRefs.current, {
      opacity: visible ? 1 : 0,
      duration: 0,
    });
  };

  // SECTION 01 animation
  const mainAnimation = () => {
    const tls1 = gsap
      .timeline()
      .to(titleRef.current, { opacity: 0 })
      .to(
        mainRef.current,
        {
          backgroundColor: theme.dark,
          color: theme.light,
        },
        0
      )
      .to(headerRef.current, {
        color: theme.light,
      })
      .to(
        circleRef.current,
        {
          borderRadius: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        },
        0
      );

    const scrollTriggerS1 = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: () => `+=${wrapperRef.current.offsetHeight}`,
      animation: tls1,
      pin: true,
      scrub: true,
    });

    return { tls1, scrollTriggerS1 };
  };

  // SECTION 02 animation
  const textAnimation = () => {
    const tls2 = gsap
      .timeline()
      .to(mainTextRef.current, {
        filter: 'blur(0px)',
        opacity: 1,
        x: 0,
      })
      .to(subTextRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
      });

    const scrollTriggerS2 = ScrollTrigger.create({
      trigger: textWrapperRef.current,
      start: 'top top',
      end: () => `+=${textWrapperRef.current.offsetHeight}`,
      animation: tls2,
      pin: true,
      pinSpacing: true,
      scrub: true,
    });

    return { tls2, scrollTriggerS2 };
  };

  // SECTION 03 animation
  const sharePartAnimation = () => {
    // 전체 이미지 섹션 파트
    const tls3 = gsap.timeline().to(
      imgCardsRef.current,
      {
        duration: 0.05,
        opacity: 1,
        ease: 'none',
      },
      0
    );

    const scrollTriggerS3 = ScrollTrigger.create({
      trigger: imgCardWrapperRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,

      onUpdate: ({ progress }) => {
        const sectionPart = Math.round(progress * 100);

        let newPart = -1;
        // 이미지들은 조금더 일찍 보여줘야 함
        if (sectionPart >= 0 && sectionPart < 20) newPart = 0;
        else if (sectionPart >= 20 && sectionPart < 40) newPart = 1;
        else if (sectionPart >= 40 && sectionPart < 60) newPart = 2;
        else if (sectionPart >= 60 && sectionPart <= 80) newPart = 3;

        imgSectionArray.current.forEach((item, i) => {
          if (i <= newPart) {
            gsap.to(item.main, {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            });
            gsap.to(item.wrapper, {
              opacity: 1,
            });
            gsap.to(item.bg, {
              opacity: 1,
              scale: 1.5,
            });
            gsap.to(item.text, {
              opacity: 1,
            });
          } else {
            gsap.to(item.main, {
              opacity: 0,
            });
            gsap.to(item.wrapper, {
              opacity: 0,
            });
            gsap.to(item.bg, {
              opacity: 0,
              scale: 0,
            });
            gsap.to(item.text, {
              opacity: 0,
            });
          }
        });
      },

      onToggle: ({ isActive }) => {
        if (isActive) {
          colorChange('light');
          fixedTextStatus(true);
          setFixedTitle({
            MainTitle: `맛있는 다양한 레시피들을 공유받아요!`,
            subTitle: `매번 반복되는 식사 고민, 이제 끝. 누구나 쉽게 따라할 수 있는 집밥 레시피부터 정성 가득한 요리까지, 지금 바로 시작해보세요. 다이어트, 비건, 혼술안주 등 키워드별로 원하는 레시피도 쉽게 찾아볼 수 있어요!`,
            buttonUrl: `/board/list`,
            buttonTitle: `레시피 보러가기`,
          });
          gsap.to(imgCardsRef.current, { opacity: 1 });
        } else {
          colorChange('dark');
          fixedTextStatus(false);
          gsap.to(imgCardsRef.current, { opacity: 0 });
        }
      },
    });

    return { tls3, scrollTriggerS3 };
  };

  // SECTION 04 animation
  const writePartAnimation = () => {
    const tls4 = gsap
      .timeline({
        defaults: {
          opacity: 1,
          y: 0,
        },
      })
      .to(
        writeImages.current[1],
        {
          ease: 'none',
          duration: 0.01,
        },
        0
      )
      .to(writeImages.current[0], { scale: 1 }, 0)
      .to(writeImages.current[1], { opacity: 0 }, '0.9')
      .to(writeImages.current[0], { opacity: 0 }, '0.9');

    const scrollTriggerS4 = ScrollTrigger.create({
      trigger: writeWrapperRef.current,
      start: 'top top',
      end: 'bottom top',
      animation: tls4,
      // markers: true,
      scrub: true,
      toggleActions: 'restart reset restart reset',
      onToggle: ({ isActive }) => {
        if (isActive) {
          setFixedTitle({
            MainTitle: `나만의 레시피, 공유하고 기록해요!`,
            subTitle: `정성껏 만든 요리가 유독 맛있게 느껴졌던 순간이 있으셨다면, 그 특별한 조리 과정을 소중히 기록해보세요. 나만의 레시피로 남기는 동시에, 다른 사람들과 함께 나누는 즐거움도 느껴보실 수 있습니다.`,
            buttonUrl: session?.data ? `/board/new` : `/user/login`,
            buttonTitle: `나만의 레시피 기록하기`,
          });
          // fixed animation
          fixedTextStatus(true);
        } else {
          // fixed animation
          fixedTextStatus(false);
        }
      },
    });
    return { tls4, scrollTriggerS4 };
  };

  // SECTION 05 animation
  const joinPartAnimation = () => {
    const wrapper = joinWrapper.current;
    const targets = wrapper.querySelectorAll(`.${styles.imgWrapper} > div`);

    // 타겟 카드들이 패럴렉스로 y 위쪽으로 움직여야 함
    const tls5 = gsap
      .timeline({
        defaults: {
          opacity: 1,
        },
      })
      .to(wrapper.querySelector('h2'), { scale: 1.1 }, 0)
      .to(wrapper.querySelector('p'), {}, 0)
      .to(wrapper.querySelector('button'), {}, 0);

    targets.forEach((item, index) => {
      const yValue = index % 2 === 0 ? -40 : -60;
      tls5.to(
        item,
        {
          yPercent: yValue,
        },
        0.5
      );
    });

    const scrollTriggerS5 = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: '+=2000',
      animation: tls5,
      pin: true,
      // markers: true,
      scrub: true,
      onToggle: ({ isActive }) => {
        targets.forEach(item => {
          item.style.borderColor = isActive ? '#f8d45e' : '#DC8006';
        });
        if (isActive) {
          colorChange('light');
        } else {
          colorChange('dark');
        }
      },
    });

    return { tls5, scrollTriggerS5 };
  };

  useEffect(() => {
    headerRef.current = document.querySelector('#logo');
    console.log(headerRef);
    const { tls1, scrollTriggerS1 } = mainAnimation();
    const { tls2, scrollTriggerS2 } = textAnimation();
    const { tls3, scrollTriggerS3 } = sharePartAnimation();
    const { tls4, scrollTriggerS4 } = writePartAnimation();
    const { tls5, scrollTriggerS5 } = joinPartAnimation();

    return () => {
      // 다른 페이지에서 애니메이션 막기
      scrollTriggerS1.kill();
      tls1.kill();
      scrollTriggerS2.kill();
      tls2.kill();
      scrollTriggerS3.kill();
      tls3.kill();
      scrollTriggerS4.kill();
      tls4.kill();
      scrollTriggerS5.kill();
      tls5.kill();
    };
  }, []);

  return (
    <main ref={mainRef} className={styles.main}>
      <div className={styles.leftFixedText}>
        <h2 ref={el => (fixedTextRefs.current[0] = el)}>{fixedTitle.MainTitle}</h2>
        <p ref={el => (fixedTextRefs.current[1] = el)}>{fixedTitle.subTitle}</p>
        <button
          ref={el => (fixedTextRefs.current[2] = el)}
          onClick={() => {
            router.refresh();
            router.push(fixedTitle.buttonUrl);
          }}
        >
          {fixedTitle.buttonTitle}
        </button>
      </div>
      {/* section 1 */}
      <section className={styles.section01}>
        <h2 ref={titleRef} className={styles.mainTitle}>
          HOME COOK
        </h2>
        <div ref={wrapperRef} className={styles.circleWrapper}>
          <div ref={circleRef} className={styles.circle}>
            <img src="/main/main_visual_2.jpg" alt="메인 요리하고 있는 이미지" />
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className={styles.section02} ref={textWrapperRef}>
        <div className={styles.textWrapper}>
          <h2 ref={mainTextRef}>Eat what today ?</h2>
          <p ref={el => (subTextRefs.current[0] = el)} className={styles.strong}>
            오늘 뭐먹지 ?
          </p>
          <p ref={el => (subTextRefs.current[1] = el)}>
            매일 반복되는 지겨운 고민, 홈쿡과 함께 해결해보세요!
          </p>
        </div>
      </section>

      {/* section 3 */}
      <section className={styles.section03} ref={imgCardWrapperRef}>
        <div className={styles.imgCards} ref={imgCardsRef}>
          {section03ImgArray.map((item, index) => (
            <div
              key={index}
              ref={el => {
                if (!imgSectionArray.current[index]) imgSectionArray.current[index] = {};
                imgSectionArray.current[index].wrapper = el;
              }}
            >
              <img
                ref={el => {
                  // 배열이 아직 정의되지 않았다면 빈 객체를 만들어서 넣는다.
                  if (!imgSectionArray.current[index]) imgSectionArray.current[index] = {};
                  imgSectionArray.current[index].main = el;
                }}
                src={item.mainImg}
                alt={`seciton03 ${index + 1} 번 메인 이미지`}
              />
              <img
                className={styles.bg}
                src={item.backImg}
                alt={`section03 ${index + 1} 번 백그라운드 이미지`}
                ref={el => {
                  if (!imgSectionArray.current[index]) imgSectionArray.current[index] = {};
                  imgSectionArray.current[index].bg = el;
                }}
              />
              <h2
                ref={el => {
                  if (!imgSectionArray.current[index]) imgSectionArray.current[index] = {};
                  imgSectionArray.current[index].text = el;
                }}
              >
                {item.text}
              </h2>
            </div>
          ))}
        </div>
      </section>

      {/* section 4 */}
      <section className={styles.section04} ref={writeWrapperRef}>
        <div>
          <div className={styles.circle} ref={el => (writeImages.current[0] = el)}></div>
          <img
            src="/main/write.png"
            alt="레시피 기록 이미지"
            ref={el => (writeImages.current[1] = el)}
          />
        </div>
      </section>

      {/* section 5 */}
      <section className={styles.section05} ref={joinWrapper}>
        <div className={styles.textContainer}>
          <h2>JOIN US !</h2>
          <p>회원 가입하고 홈쿡과 함께 요리의 즐거움에 빠져 보세요!!</p>
          <button
            onClick={() => {
              router.refresh();
              router.push('/user/register');
            }}
          >
            회원 가입하기
          </button>
        </div>
        <div className={styles.imgContainer}>
          <div className={styles.imgWrapper}>
            <div>
              <img src="/main/section05_ parallax_1.png" alt="" />
            </div>
            <div>
              <img src="/main/section05_ parallax_2.png" alt="" />
            </div>
            <div>
              <img src="/main/section05_ parallax_3.png" alt="" />
            </div>
            <div>
              <img src="/main/section05_ parallax_4.png" alt="" />
            </div>
            <div>
              <img src="/main/section05_ parallax_5.png" alt="" />
            </div>
            <div>
              <img src="/main/section05_ parallax_6.png" alt="" />
            </div>
          </div>
        </div>
      </section>
      {/* <section className={styles.section06}></section> */}
    </main>
  );
}
