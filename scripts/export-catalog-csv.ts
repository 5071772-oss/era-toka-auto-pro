import { writeFile } from "node:fs/promises"
import { CARS } from "../src/lib/catalog-data"

const headers = [
  "Brand",
  "Model",
  "Category",
  "Price",
  "Currency",
  "Description",
  "Specifications",
  "Main photo",
  "Additional photos",
  "Video URL",
]

function escapeCsv(value: unknown) {
  const text = String(value ?? "")
  return `"${text.replaceAll('"', '""').replaceAll("\r", " ").replaceAll("\n", " ")}"`
}

const rows = CARS.map((car) => {
  const video = car.specs.match(/Тест-драйв и обзор на этот автомобиль (https?:\/\/\S+)/)?.[1] ?? ""
  return [
    car.brand,
    car.title,
    "Электромобиль или гибрид",
    car.price,
    "CNY",
    car.specs.split(" | Информация о покупке")[0],
    car.specs,
    car.img,
    car.images?.join(" | ") ?? "",
    video,
  ]
})

const csv = [headers, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n") + "\n"
await writeFile("public/catalog-import.csv", `\ufeff${csv}`, "utf8")
console.log(`Exported ${CARS.length} catalog records to public/catalog-import.csv`)
