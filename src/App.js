import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import "./styles.css";

gsap.registerPlugin(Flip);

const filterData = [
  { key: "406349dc2b82090fc013779250810d84", id: "allCheck", value: "all", label: "All" },
  { key: "a60d8cc07e9b0d6f57bcb8ded7b7da33", id: "greenCheck", value: "green", label: "Green" },
  { key: "293e898899c66c5b452c13dfb73abd74", id: "orangeCheck", value: "orange", label: "Orange" },
  { key: "f51d8f6880043674328ddb45123a8700", id: "purpleCheck", value: "purple", label: "Purple" }
];

const filtersInitArray = filterData.map((e) => e.value);
filtersInitArray.shift();

const elementsData = [
  {
    "id": "66dccd6b45fab529c10583c7eabd974c",
    "type": "green"
  }, {
    "id": "19f15869ca42ec22e3af68748c358f2e",
    "type": "green"
  }, {
    "id": "7abb9ed363c90128d0ddd6d9b687e771",
    "type": "orange"
  }, {
    "id": "5162114a285af56bcae3440d8afb8917",
    "type": "purple"
  }, {
    "id": "e44ba992c2c8ad38fde8c04bbe1d7d3c",
    "type": "orange"
  }, {
    "id": "dbe6edd40feaa3cd75d83c750a302f22",
    "type": "purple"
  }, {
    "id": "64c0105243f140438d1ffe9d03ca0463",
    "type": "orange"
  }, {
    "id": "f6dd49fd8df050dee4f763b56c1a1fac",
    "type": "orange"
  }, {
    "id": "d301edb5066bb1f000a626df1a2aab1e",
    "type": "green"
  }, {
    "id": "481c393926c852245242104aa746664e",
    "type": "green"
  }
];

export default () => {
  const [filter, setFilter] = useState(filtersInitArray);
  const elements = useRef([]);

  useEffect(() => {
    const state = Flip.getState(elements.current);
    const matches = filter.length
      ? gsap.utils.toArray(filter.map(e => "." + e).join(","))
      : filter;
    // Update the display of the filtered elements
    elements.current.forEach((el) => {
      el.style.display = matches.indexOf(el) === -1 ? "none" : "inline-flex";
    });
    // Create the animation
    Flip.from(state, {
      duration: 1,
      scale: true,
      absolute: true,
      ease: "power1.inOut",
      onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0}, {opacity: 1, scale: 1, duration: 1}),
      onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0, duration: 1})
    });
  }, [filter]);

  const filterChangeHandler = ({ target }) => {
    const { value, checked } = target;
    if (value === "all") {
      if (checked) {
        setFilter(filtersInitArray);
      } else {
        setFilter([]);
      }
    } else {
      if (checked) {
        setFilter([].concat(filter, value));
      } else {
        setFilter(filter.filter(e => e !== value));
      }
    }
  };

  const setRefs = (e, i) => {
    const { current } = elements;
    current[i] = e;
  };

  const renderFilters = () => {
    return filterData.map((e) => <div className="form-check form-check-inline" key={e.key}>
      <label className="form-check-label" htmlFor={e.id}>
        <input
          className="form-check-input"
          type="checkbox"
          value={e.value}
          id={e.id}
          checked={
            e.value === "all"
              ? (filter.length === filterData.length - 1)
              : filter.indexOf(e.value) > -1
          }
          onChange={filterChangeHandler}
        />
        {e.label}
      </label>
    </div>);
  };

  const renderElements = () => {
    return elementsData.map((e, i) => <div
      className={`filter-element ${e.type}`}
      key={e.id}
      ref={el => setRefs(el, i)}
    />);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 py-3">
          <h3 className="text-center">GSAP Flip Plugin & React</h3>
          <hr/>
        </div>
        <div className="col-12 text-center">
          <div>
            {renderFilters()}
          </div>
          <hr/>
        </div>
        <div className="element-container">
          {renderElements()}
        </div>
      </div>
    </div>
  );
};
