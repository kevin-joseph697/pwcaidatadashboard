import papa from "papaparse";
import { IDataset, IDatasetRecord } from "../types";
import { OpenAI } from "langchain/llms/openai";
import { JsonSpec, JsonObject } from "langchain/tools";
import { JsonToolkit, createJsonAgent } from "langchain/agents";

export async function opeanApiSearch (data:any){
  // const jsonResult:any = JSON.stringify(data)
  const jsonResult = data as JsonObject
  const toolkit = new JsonToolkit(new JsonSpec(jsonResult))
  const model = new OpenAI({temperature:0,openAIApiKey:process.env.openAiApiKey})

  const executor = createJsonAgent(model, toolkit);

  const input = `Highest Price in the table?`;

  console.log(`Executing with input "${input}"...`);

  const result = await executor.call({ input });

  console.log(
    `Got intermediate steps ${JSON.stringify(
      result,
      null,
      2
    )}`
  );
}

export function isDataValid(dataset: string) {
  try {
    const data = parseData(dataset);
    return !!data.length;
  } catch (err) {
    return false;
  }
}

export function parseData(dataset: string) {
  const result = papa.parse(dataset, {
    header: true,
  });

  if (!result.data) return [];
  // const funcResult : any = opeanApiSearch(result)
  // console.log(funcResult)
  const emptyColumns = result.meta.fields || [];

  if (!emptyColumns.length) return result.data as IDataset;

  return (result.data as IDataset)
    .map((row) => {
      delete row[""];
      return row;
    })
    
}

export function stringifyData(dataset: IDataset, delimiter?: string) {
  return papa.unparse(dataset, {
    delimiter: delimiter || "\t",
  });
}
