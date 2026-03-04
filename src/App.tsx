import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);
const ITEMS_PER_PAGE_OPTIONS = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const itemsCount = items.length;
  const pagesCount = Math.ceil(itemsCount / itemsPerPage);

  const handlePerPageSelector = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = Number(event.currentTarget.value);

    if (ITEMS_PER_PAGE_OPTIONS.includes(value)) {
      setCurrentPage(1);
      setItemsPerPage(value);
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagesCount) {
      setCurrentPage(page);
    } else {
      setCurrentPage(page > pagesCount ? pagesCount : 1);
    }
  };

  const itemsStartPosition = (currentPage - 1) * itemsPerPage;
  let itemsEndPosition = itemsStartPosition + itemsPerPage;

  if (itemsEndPosition > itemsCount) {
    itemsEndPosition = itemsCount;
  }

  const infoText = `Page ${currentPage} (items ${itemsStartPosition + 1} - ${itemsEndPosition} of ${itemsCount})`;
  const pageItems = items.slice(itemsStartPosition, itemsEndPosition);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {infoText}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handlePerPageSelector}
          >
            {ITEMS_PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={itemsCount}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <ul>
        {pageItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
