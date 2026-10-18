
export function formatDate(date) {
  if (!date) return "";

  const value = String(date).trim().split("T")[0];

  let year;
  let month;
  let day;

  // صيغة قاعدة البيانات: YYYY-MM-DD
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(value)) {
    [year, month, day] = value.split("-").map(Number);
  }
  // الصيغة القديمة: DD-MM-YYYY
  else if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(value)) {
    [day, month, year] = value.split("-").map(Number);
  } else {
    return "تاريخ غير صالح";
  }

  // التحقق من صحة التاريخ
  const parsedDate = new Date(year, month - 1, day);

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return "تاريخ غير صالح";
  }

  // عرض التاريخ باللغة العربية بالتقويم الميلادي
  return parsedDate.toLocaleDateString("ar-SA", {
    calendar: "gregory",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
