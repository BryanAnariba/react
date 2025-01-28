/* For bucle for arrays */
const tecnologies = ["Node", "Java", "Python", "PHP", 'NestJS'];

for (let i = 0; i < tecnologies.length; i++) {
  console.log(tecnologies[i]);
}

tecnologies.forEach((tecno) => {
  console.log({ tecno });
});
