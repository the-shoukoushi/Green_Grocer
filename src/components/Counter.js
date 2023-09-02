import React, { useEffect, useState, useMemo } from "react";

const Counter = ({ shouldStart }) => {
  const valueDisplays = useMemo(() => [
    { label: "Deliveries Completed", endValue: 23000 },
    { label: "Kilos of Freshness Savored", endValue: 51000 },
    { label: "Happy Customers", endValue: 8500 },
  ], []);

  const duration = 1000;
  const incrementStep = 150;

  const [counterStarted, setCounterStarted] = useState(false);

  useEffect(() => {
    if (shouldStart && !counterStarted) {
      let maxEndValue = 0;

      valueDisplays.forEach((display) => {
        if (display.endValue > maxEndValue) {
          maxEndValue = display.endValue;
        }
      });

      valueDisplays.forEach((display) => {
        const { label, endValue } = display;
        let startValue = 0;

        const incrementInterval = (duration * incrementStep) / maxEndValue;
        const increment = Math.ceil(endValue / (duration / incrementInterval));

        const counter = setInterval(() => {
          startValue += increment;

          if (startValue >= endValue) {
            startValue = endValue;
            clearInterval(counter);
          }

          document.querySelector(
            `.counter-nums[data-label="${label}"]`
          ).textContent = startValue.toLocaleString() + "+";
        }, incrementInterval);
      });

      setCounterStarted(true);
    }
  }, [shouldStart, counterStarted, valueDisplays]);

  return (
    <section className="counter">
      <div className="counter-row">
        {valueDisplays.map((display, index) => (
          <div className="counter-col" key={index}>
            <h2
              className="counter-nums"
              data-label={display.label}
              data-val={display.endValue}
            >
              0+
            </h2>
            <p>{display.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Counter;
