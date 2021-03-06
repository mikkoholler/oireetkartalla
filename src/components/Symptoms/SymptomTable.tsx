import React from 'react'
import styled from 'styled-components'
import { symptomQuestions } from './questions'
import { otherQuestions } from './questions'
import { colors } from '../../GlobalStyles'

export type QuestionKey =
  | 'fever'
  | 'cough'
  | 'soreThroat'
  | 'shortOfBreath'
  | 'musclePain'
  | 'fatigue'
  | 'hasInfection'
  | 'hasBeenInContact'
  | 'isInRiskGroup'

export type AnswerType = {
  [key in QuestionKey]: string
}

export interface SymptomTableProps {
  answers: AnswerType
  onAnswersUpdated(answers: AnswerType): void
}

export const SymptomTable: React.FC<SymptomTableProps> = (props) => {
  const { answers, onAnswersUpdated } = props
  const onQuestionAnswered = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target
    onAnswersUpdated({
      ...answers,
      [el.name]: el.value,
    })
  }

  return (
    <>
      <QuestionContainer>
        <h2>{symptomQuestions.title}</h2>
        <Table>
          <tbody>
            {symptomQuestions.rows.map((row) => (
              <tr key={row.id}>
                <td>{row.label}</td>
                {symptomQuestions.options.map((opt) => {
                  const checked = answers[row.id as QuestionKey] === opt.value
                  return (
                    <td key={opt.value}>
                      <Label active={checked}>
                        {opt.label}
                        <input
                          type="radio"
                          name={row.id}
                          value={opt.value}
                          checked={checked}
                          onChange={onQuestionAnswered}
                        />
                      </Label>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </QuestionContainer>

      {otherQuestions.map((q) => (
        <QuestionContainer>
          <h2>{q.title}</h2>
          <Options>
            {q.options.map((o) => {
              const checked = answers[q.id as QuestionKey] === o.value
              return (
                <Label active={checked}>
                  {o.label}
                  <input
                    type="radio"
                    name={q.id}
                    value={o.value}
                    checked={checked}
                    onChange={onQuestionAnswered}
                  />
                </Label>
              )
            })}
          </Options>
        </QuestionContainer>
      ))}
    </>
  )
}

const QuestionContainer = styled.div`
  padding: 1rem;
  width: 100%;

  &:nth-child(even) {
    background: #f5f5f5;
  }
`

const Table = styled.table`
  width: 100%;

  td {
    height: 45px;
  }

  th {
    font-weight: 400;
    font-size: 0.95rem;
  }

  td:not(:first-child) {
    text-align: center;
    width: 18%;
  }

  input {
    padding: 0.5rem;
  }
`

interface LabelProps {
  active: boolean
}

const Label = styled.label<LabelProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  background: ${(props) => (props.active ? colors.primary : 'transparent')};
  color: ${(props) => (props.active ? 'white' : colors.text)};
  padding: 0.5rem;
  border-radius: 3px;

  input {
    display: none;
  }
`

const Options = styled.div`
  display: flex;
`
