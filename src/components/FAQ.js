import React, { useState } from "react";

import { ReactComponent as Question } from "../assets/faq.svg";
import { ReactComponent as Wave } from "../assets/wave.svg";
import { ReactComponent as Arrow } from "../assets/arrow.svg";

import "../css/FAQ.css";

function FAQ() {
  const questions = [
    {
      id: 1,
      question: "Why aren't pricing and dates listed?",
      answer:
        "Geekhack gives its users complete control over how they design their post, whether IC or GB. Some people like to include pricing and/or dates within images, or tag the information in different ways. With that said, it can be hard, tedious, and unpredictable to find the information using our current approach.",
    },
    {
      id: 2,
      question: "What is the purpose of Keytonomy?",
      answer:
        "Keytonomy was created to be the first stop for looking at interest checks and group buys on Geekhack. Unlike other tools, Keytonomy is autonomous and constantly up to date. Each post provides the ability for you to view all its images without the need to open.",
    },
    {
      id: 3,
      question: "Why should I use Keytonomy over Geekhack?",
      answer:
        "Keytonomy wasn't created to replace Geekhack. Instead, it is mean't to be used as a tool for seeing what posts exist. Think of it like an alternate way of viewing interest checks and group buys. If you're interested in learning more about the post you can always view the original using the provided link.\n\nIf you're someone that doesn't like how Geekhack looks or how each post is displayed, Keytonomy has you covered.",
    },
    {
      id: 4,
      question: "Is there a way I can save a post?",
      answer:
        "Not at this moment in time. Saving posts is a feature that is definitely on our roadmap along with some other exciting things. However, it is unknown when these will be available.",
    },
    {
      id: 5,
      question: "How often is Keytonomy updated?",
      answer: "Keytonomy is updated roughly every minute.",
    },
  ];
  const [activeQuestion, setActiveQuestion] = useState();
  const handleClick = (id) => {
    if (activeQuestion === id) {
      setActiveQuestion();
    } else {
      setActiveQuestion(id);
    }
  };
  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <div className="faq-content">
        {activeQuestion ? (
          <div className="faq-single-container">
            <div
              className="faq-question-container"
              onClick={() => setActiveQuestion()}
            >
              <p className="faq-question">
                {questions[activeQuestion - 1]["question"]}
              </p>
              <Arrow
                style={{
                  transform: "rotate(90deg)",
                  transition: "transform 300ms",
                  backgroundColor: "var(--orange)",
                }}
                className="arrow"
              />
            </div>
            <div className="faq-answer-container">
              <p className="faq-answer">
                {questions[activeQuestion - 1]["answer"]}
              </p>
            </div>
          </div>
        ) : (
          questions.map((item) => (
            <div
              className="faq-question-container"
              onClick={() => handleClick(item["id"])}
            >
              <p className="faq-question">{item["question"]}</p>
              <Arrow className="arrow" />
            </div>
          ))
        )}
      </div>
      <Question className="faq-illustration" />
      <Wave />
    </div>
  );
}

export default FAQ;
