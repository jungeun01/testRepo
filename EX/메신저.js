const chatBox = document.querySelector("#chat-box");
const input = document.querySelector("#input");
const send = document.querySelector("#sendBtn");
//-----------------------------------------

function MyText() {
  const newMessage = input.value;
  if (newMessage.length == 0) {
    return false;
  }
  let chaneMessage = newMessage.replaceAll(" ", "&nbsp;");
  chaneMessage = chaneMessage.replaceAll("\n", "<br/>");

  const div = document.createElement("div");
  div.innerHTML = chaneMessage;
  div.classList.add("bubble", "my-bubble");
  chatBox.append(div);
  input.value = "";
}

function MyTextBy(e) {
  if (e.key == "Enter" && !e.shiftkey) {
    MyText();
    e.preventDefault();
  }
}
send.addEventListener("click", MyText);
input.addEventListener("keypress", MyTextBy);
