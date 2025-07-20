import React from "react";

const SearchBar = ({ filters, setFilters, onSearch }) => {
    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="card p-3 mb-4">
            <div className="row g-2">
                <div className="col-md-3">
                    <input
                        type="text"
                        name="keyword"
                        placeholder="Search..."
                        className="form-control"
                        value={filters.keyword}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-2">
                    <select
                        name="type"
                        className="form-select"
                        value={filters.type}
                        onChange={handleChange}
                    >
                        <option value="">All Types</option>
                        <option value="ELECTRONICS">ELECTRONICS</option>
                        <option value="BEAUTY">BEAUTY</option>
                        <option value="CLOTHING">CLOTHING</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        name="minPrice"
                        className="form-control"
                        placeholder="Min Price"
                        value={filters.minPrice}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        type="number"
                        name="maxPrice"
                        className="form-control"
                        placeholder="Max Price"
                        value={filters.maxPrice}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary w-100" onClick={onSearch}>
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
