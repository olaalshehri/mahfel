import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EventFilters({ onFilter }) {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState(null);
  const [sort, setSort] = useState("newest");

  const handleFilter = (type, value) => {
    if (type === "category") setCategory(value);
    if (type === "city") setCity(value);
    if (type === "date") setDate(value);
    if (type === "sort") setSort(value);

    onFilter({
      category: type === "category" ? value : category,
      city: type === "city" ? value : city,
      date: type === "date" ? value : date,
      sort: type === "sort" ? value : sort,
    });
  };

  const resetFilters = () => {
    setCategory("");
    setCity("");
    setDate(null);
    setSort("newest");

    onFilter({
      category: "",
      city: "",
      date: null,
      sort: "newest",
    });
  };

  return (
    <div className="event-filters">
      <div className="filter-item">
        <label>التصنيف</label>
        <select
          value={category}
          onChange={(e) => handleFilter("category", e.target.value)}
        >
          <option value="">جميع التصنيفات</option>
          <option value="cultural">ثقافية</option>
          <option value="sports">رياضية</option>
          <option value="education">تعليمية</option>
        </select>
      </div>

      <div className="filter-item">
        <label>المدينة</label>
        <select
          value={city}
          onChange={(e) => handleFilter("city", e.target.value)}
        >
          <option value="">جميع المدن</option>
          <option value="الرياض">الرياض</option>
          <option value="جدة">جدة</option>
          <option value="الطائف">الطائف</option>
          <option value="العلا">العلا</option>
          <option value="الظهران">الظهران</option>

        </select>
      </div>

      <div className="filter-item">
        <label>التاريخ</label>
        <DatePicker
          selected={date}
          onChange={(value) => handleFilter("date", value)}
          placeholderText="اختر التاريخ"
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className="filter-item">
        <label>الترتيب حسب</label>
        <select
          value={sort}
          onChange={(e) => handleFilter("sort", e.target.value)}
        >
          <option value="newest">الأحدث أولًا</option>
          <option value="oldest">الأقدم أولًا</option>
        </select>
      </div>

      <button
        type="button"
        className="btn-filter"
        onClick={resetFilters}
      >
        مسح التصنيف
      </button>
    </div>
  );
}

export default EventFilters;