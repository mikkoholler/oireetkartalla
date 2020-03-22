import { AnswerType } from "./components/Symptoms/SymptomTable"

async function postJson(path: string, body: object) {
  return fetch(path, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(body)
})
}

export async function postAnswers(answers: AnswerType): Promise<void> {
    postJson('/answers', answers)
}
