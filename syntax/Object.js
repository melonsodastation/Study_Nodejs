var members = ["DK", "ok", "MJ"];
console.log(1);

var i = 0;
while (i < members.length) {
  console.log("member", members[i]);
  i += 1;
}

var roles = {
  K: "Cleaner",
  o: "Designer",
  M: "Eater",
};
// console.log(roles.DK);
// console.log(roles.Eater);
//key값을 문자로 보내도 됨 ... roles["Designers"]

for (var name in roles) {
  console.log("object =>", `${name},`, "value =>", roles[name]);
}

//var 변수 in 객채명
//key는 변수명, 밸류는 객채명[변수명명
