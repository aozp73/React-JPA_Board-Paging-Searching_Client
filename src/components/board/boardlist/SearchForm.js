import React from 'react';
import {useNavigate} from "react-router-dom";

const SearchForm = ({ searchType, setSearchType, searchKeyword, setSearchKeyword}) => {
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/board/list?searchType=${searchType}&searchKeyword=${searchKeyword}&page=1`);
    };

    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={handleSearch}>
                <div className="input-group">
                    <select className="form-select me-2" style={{ width: '97px' }}
                            value={searchType}
                            onChange={e => setSearchType(e.target.value)}>
                        <option value="title" >제목</option>
                        <option value="author">작성자</option>
                    </select>
                    <input type="text" className="form-control" style={{ width: '270px' }}
                           placeholder="검색어를 입력하세요" value={searchKeyword}
                           onChange={e => setSearchKeyword(e.target.value)} />
                    <button type="submit" className="btn btn-secondary">검색</button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;
