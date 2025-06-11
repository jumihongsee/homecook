'use client';
import { useState } from 'react';
import BoardUI from '../board/components/boardListUI';
import styles from './search.module.scss';

export default function search() {
  const [option, setOption] = useState('title');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [alert, setAlert] = useState('✔ 레시피 제목, 재료로 검색할 수 있습니다.');
  const [activeTagIndex, setActiveTagIndex] = useState(null);
  const [searchTitle, setSearchTitle] = useState(null);

  const handleSearch = async e => {
    e.preventDefault();
    setSearchTitle(searchKeyword);
    const result = await fetch(`/api/search/keyword?type=${option}&keyword=${searchKeyword}`);
    const data = await result.json();

    setActiveTagIndex(null);
    if (data.data.length > 0) {
      setSearchData(data.data);
    } else {
      setSearchData([]);
      setAlert('✔ 검색 결과가 없습니다.');
    }
    setSearchKeyword('');
  };
  const handleTagSearch = async (type, keyword, index) => {
    const result = await fetch(`/api/search/tag?type=${type}&keyword=${keyword}`);
    const data = await result.json();
    setActiveTagIndex(index);
    setSearchTitle(null);
    setSearchKeyword('');
    if (data.data.length > 0) {
      setSearchData(data.data);
    } else {
      setSearchData([]);
      setAlert('✔ 검색 결과가 없습니다.');
    }
  };

  console.log(searchData);
  return (
    <section className={styles.search}>
      <form onSubmit={handleSearch}>
        <select
          className={styles.select}
          onChange={e => {
            setOption(e.target.value);
          }}
        >
          <option value="title">제목으로 검색</option>
          <option value="ingredient">재료로 검색</option>
        </select>
        <div>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchKeyword}
            onChange={e => {
              setSearchKeyword(e.target.value);
            }}
          />
          <button type="submit">검색하기</button>
        </div>
      </form>
      <div className={styles.tagSearch}>
        <h3>키워드 별 레시피 리스트</h3>
        <div className={styles.tags}>
          <button
            type="button"
            className={activeTagIndex === 0 ? styles.active : ''}
            onClick={() => handleTagSearch('time', '10', 0)}
          >
            # 10분요리
          </button>
          <button
            type="button"
            className={activeTagIndex === 1 ? styles.active : ''}
            onClick={() => handleTagSearch('time', '20', 1)}
          >
            # 20분요리
          </button>
          <button
            type="button"
            className={activeTagIndex === 2 ? styles.active : ''}
            onClick={() => handleTagSearch('time', '30', 2)}
          >
            # 30분요리
          </button>
          <button
            type="button"
            className={activeTagIndex === 3 ? styles.active : ''}
            onClick={() => handleTagSearch('difficulty', 'easy', 3)}
          >
            # 난이도 쉬움
          </button>
          <button
            type="button"
            className={activeTagIndex === 4 ? styles.active : ''}
            onClick={() => handleTagSearch('difficulty', 'normal', 4)}
          >
            # 난이도 보통
          </button>
          <button
            type="button"
            className={activeTagIndex === 5 ? styles.active : ''}
            onClick={() => handleTagSearch('difficulty', 'hard', 5)}
          >
            # 난이도 어려움
          </button>
        </div>
        <div className={styles.tags}>
          <button
            type="button"
            className={activeTagIndex === 6 ? styles.active : ''}
            onClick={() => handleTagSearch('thema', 'simple', 6)}
          >
            # 간단요리
          </button>
          <button
            type="button"
            className={activeTagIndex === 7 ? styles.active : ''}
            onClick={() => handleTagSearch('thema', 'diet', 7)}
          >
            # 다이어트
          </button>
          <button
            type="button"
            className={activeTagIndex === 8 ? styles.active : ''}
            onClick={() => handleTagSearch('thema', 'vegan', 8)}
          >
            # 비건요리
          </button>
          <button
            type="button"
            className={activeTagIndex === 9 ? styles.active : ''}
            onClick={() => handleTagSearch('thema', 'ramen', 9)}
          >
            # 라면변신
          </button>
          <button
            type="button"
            className={activeTagIndex === 10 ? styles.active : ''}
            onClick={() => handleTagSearch('thema', 'drink', 10)}
          >
            # 혼술안주
          </button>
        </div>
      </div>
      {/* 검색 키워드가 있을시에 BoardUI 를 보여줘야함 list 형태로 볼 수 있도록  */}
      {searchData.length ? (
        <BoardUI data={searchData} status={'search'} searchTitle={searchTitle} />
      ) : (
        <section className={styles.infoSection}>
          <h3>레시피를 찾아 볼까요?</h3>
          <p>지금 먹고 싶은 요리들을 검색해 보세요!</p>
          <p className={styles.alert}>{alert}</p>
        </section>
      )}
    </section>
  );
}
