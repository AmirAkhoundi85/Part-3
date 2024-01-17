import React from "react";
import Header from "./Header";
import Content from "./Content";



const Course = ({ course }) => {
 const totalExe = course.parts.reduce((total, part)=>{
  return total + part.exercises },0)


 return (
  <>
  <Header name={course.name}/>
  <Content parts={course.parts}></Content>
  <strong>Total of {course.name}: {totalExe}</strong>
  </>
 )
};

export default Course;
