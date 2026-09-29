"use client";

import * as XLSX from "xlsx";
import { ExamType, HealthRecord } from "./types";

const headers = [
  "No.",
  "프로젝트코드",
  "출장직원ID",
  "사용자",
  "휴대전화번호",
  "협력사코드",
  "협력사",
  "직무구분",
  "근무형태구분코드",
  "국가코드",
  "나이",
  "건강검진일자",
  "건강검진구분코드\n1. 일반건강진단\n2. 특수건강진단\n3. 배치전건강진단",
  "건강검진결과구분코드\nA(정상)\nB(경계)\nC1(직업성 요관찰자)\nC2(일반질병 요관찰자)\nCN(야간작업 요관찰자)\nD1(직업성 유소견자)\nD2(일반질병 유소견자)\nDN(야간작업 유소견자)\nR(재검)\nU(판정불가)\nV(취업시)",
  "비고",
];

const examCode: Record<ExamType, number> = { general: 1, special: 2, preplacement: 3 };
const examLabel: Record<ExamType, string> = { general: "일반건강검진", special: "특수건강진단", preplacement: "배치전건강진단" };

export function downloadHealthExcel(type: ExamType, records: HealthRecord[]) {
  const filtered = records.filter((r) => r.examType === type);
  const rows = filtered.map((r, idx) => [
    idx + 1,
    r.siteCode,
    "",
    r.workerName,
    r.phoneLast4,
    r.companyCode,
    r.companyName,
    r.jobType,
    "공통",
    "",
    r.age >= 63 ? `${r.age} (고령자)` : String(r.age),
    r.examDate,
    examCode[type],
    r.resultCode,
    r.note,
  ]);

  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  ws["!cols"] = [
    { wch: 6 }, { wch: 14 }, { wch: 14 }, { wch: 12 }, { wch: 14 },
    { wch: 14 }, { wch: 20 }, { wch: 14 }, { wch: 16 }, { wch: 10 },
    { wch: 14 }, { wch: 16 }, { wch: 32 }, { wch: 34 }, { wch: 28 },
  ];
  ws["!rows"] = [{ hpt: 95 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, examLabel[type]);
  const ymd = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  XLSX.writeFile(wb, `${examLabel[type]}_${ymd}.xlsx`);
}
