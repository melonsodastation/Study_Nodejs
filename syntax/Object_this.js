var o = {
  v1: "1",
  v2: "2",
  f1: function () {
    console.log(this.v1);
  },
  f2: function () {
    console.log(this.v2);
  },
};

o.f1();

//객체는 그룹핑이다~
//객체안에서 객체 본인을 'this'로 표현가능
//정리정돈을 통해서 코드를 간단하게.
