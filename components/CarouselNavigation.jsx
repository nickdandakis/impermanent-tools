function CarouselNavigation({
  onNext,
  onPrevious,
  isNextDisabled,
  isPreviousDisabled,
}) {
  return (
    <div className="carousel-navigation">
      <button disabled={isPreviousDisabled} onClick={onPrevious}>
        👈
      </button>
      <button disabled={isNextDisabled} onClick={onNext}>
        👉
      </button>
      <style jsx>{`
        .carousel-navigation {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: center;
        }

        button {
          font-size: 24px;
          background: rgba(0, 0, 0, 0.2);
        }
        button:disabled {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default CarouselNavigation;
