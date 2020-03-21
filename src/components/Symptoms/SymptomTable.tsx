import React from "react";
import styled from "styled-components";
import { symptomQuestions } from "./questions";
import { otherQuestions } from "./questions";

export const SymptomTable = () => {
  return (
    <>
      <QuestionContainer>
        <h2>{symptomQuestions.title}</h2>
        <Table>
          <tbody>
            <tr>
              <th />
              {symptomQuestions.options.map(option => (
                <th key={option.label}>{option.label}</th>
              ))}
            </tr>
          </tbody>

          {symptomQuestions.rows.map(row => (
            <tr>
              <td>{row.label}</td>
              {symptomQuestions.options.map(o => (
                <td key={o.value}>
                  <input type="radio" name={row.label} value={o.value} />
                </td>
              ))}
            </tr>
          ))}
        </Table>
      </QuestionContainer>

      {otherQuestions.map(q => (
        <QuestionContainer>
          <h2>{q.title}</h2>
          <Options>
            {q.options.map(o => (
              <label>
                {o.label}
                <input type="radio" name={q.title} value={o.value} />
              </label>
            ))}
          </Options>
        </QuestionContainer>
      ))}
    </>
  );
};

const QuestionContainer = styled.div`
  padding: 1rem;
  width: 100%;

  &:nth-child(even) {
    background: #f5f5f5;
  }
`;

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
`;

const Options = styled.div`
  display: flex;

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    text-align: center;
    justify-content: space-between;

    input {
      margin-top: 1rem;
    }
  }
`;
