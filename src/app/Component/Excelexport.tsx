import * as XLSX from "xlsx";

export const exportToExcel = (data: object[], filename: string) => {
  if (data.length > 0) {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${filename}.xlsx`);
  } else {
    alert("No records found to generate excel data");
  }
};
