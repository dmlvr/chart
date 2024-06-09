import { Cost, CostObj, Data, Usag, UsagWithSort } from "@/types";
import { getUpdateUsages } from "@/utils";
import { getUpdateCosts } from "@/utils/getUpdateCosts";
import csv from "csvtojson";
import { NextResponse } from "next/server";

type JSONObject = { [key: string]: string | number };

export async function GET() {
  async function convertCSVtoJSON(csvFilePath: string): Promise<JSONObject[]> {
    try {
      const jsonObj = await csv({
        checkType: true,
      }).fromFile(csvFilePath);
      return jsonObj;
    } catch (err) {
      throw new Error(`Ошибка преобразования CSV в JSON: ${err}`);
    }
  }

  async function getData(): Promise<Data> {
    const usages = getUpdateUsages(
      (await convertCSVtoJSON("./public/usages.csv")) as Usag[]
    ) as UsagWithSort[];

    const costs = getUpdateCosts(
      (await convertCSVtoJSON("./public/costs.csv")) as Cost[]
    ) as CostObj;

    return {
      costs,
      usages,
    };
  }

  const { usages, costs } = await getData();

  return NextResponse.json({ usages, costs }, { status: 200 });
}
