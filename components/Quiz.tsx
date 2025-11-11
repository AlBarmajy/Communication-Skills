import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { chapterQuizzes } from '../constants';
import type { Question } from '../types';

const Quiz: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleChapterSelect = (chapter: string) => {
    setSelectedChapter(chapter);
    // Reset state
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleAnswerClick = (answer: string) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    if (answer === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizFinished(true);
    }
  };

  if (!selectedChapter) {
    return (
      <div className="text-center">
        <h1 className="display-5 fw-bold mb-3">Practice Questions</h1>
        <p className="lead text-muted mb-5">Select a chapter to begin your quiz.</p>
        <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
          {Object.keys(chapterQuizzes).map(chapter => (
            <Col key={chapter}>
              <Card 
                className="h-100 shadow-sm cursor-pointer"
                onClick={() => handleChapterSelect(chapter)}
              >
                <Card.Body className="d-flex align-items-center justify-content-center">
                  <Card.Title className="text-primary">{chapter}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  const questions = chapterQuizzes[selectedChapter];
  const currentQuestion: Question = questions[currentIndex];
  
  if (quizFinished) {
    return (
        <Card className="text-center shadow-lg">
            <Card.Header as="h5">Quiz Complete!</Card.Header>
            <Card.Body>
                <Card.Title>Results for {selectedChapter}</Card.Title>
                <Card.Text className="display-4 fw-bold text-primary my-3">
                    {score} / {questions.length}
                </Card.Text>
                <Button variant="primary" onClick={() => handleChapterSelect(selectedChapter)} className="me-2">
                    Retry Quiz
                </Button>
                <Button variant="outline-secondary" onClick={() => setSelectedChapter(null)}>
                    Choose Another Chapter
                </Button>
            </Card.Body>
        </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
            <span>{selectedChapter} Quiz</span>
            <span className="text-muted">Question {currentIndex + 1} of {questions.length}</span>
        </div>
      </Card.Header>
      <Card.Body className="p-4">
        <Card.Title className="mb-4 fs-4">{currentQuestion.questionText}</Card.Title>
        <div className="d-grid gap-2">
            {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = currentQuestion.correctAnswer === option;
                let variant = 'outline-primary';
                if(showFeedback) {
                    if(isCorrect) variant = 'success';
                    else if (isSelected && !isCorrect) variant = 'danger';
                    else variant = 'outline-secondary';
                }

                return (
                    <Button 
                        key={option} 
                        variant={variant}
                        onClick={() => handleAnswerClick(option)}
                        disabled={showFeedback}
                        size="lg"
                    >
                        {option}
                    </Button>
                );
            })}
        </div>
        
        {showFeedback && (
            <Alert variant={selectedAnswer === currentQuestion.correctAnswer ? 'success' : 'danger'} className="mt-4">
                <Alert.Heading>
                    {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                </Alert.Heading>
                <p>{currentQuestion.explanation}</p>
            </Alert>
        )}

      </Card.Body>
      <Card.Footer className="text-end">
        {showFeedback && (
            <Button onClick={handleNextQuestion}>
                {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default Quiz;