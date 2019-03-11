module.exports = function check(str, bracketsConfig) {
  let stack = [];
  let i = 0;

  next:
  while (i < str.length) {
    if (stack.length > 0) {
      // скобка открыта, попробуем ее закрыть
      for (let j = 0; j < bracketsConfig.length; j++) {
        if (str[i] === bracketsConfig[j][1]) {
          // нашли какую-то закрывающую скобку
          if (stack[stack.length - 1] === bracketsConfig[j][0]) {
            // текущий символ совпадает с закрывающей скобкой и соответствующая открывающая открыта
            stack.pop();
            // переходим к следующему символу
            i++;
            continue next;
          } else {
            // нашли закрывающую, но она не совпадает с той, что на стеке (открытой)
            // может быть, закрывающая совпадает с открывающей
            for (let j = 0; j < bracketsConfig.length; j++) {
              if (str[i] === bracketsConfig[j][0]) {
                stack.push(str[i]);
                i++;
                continue next;
              }
            }
            return false;
          }
        }
      }
    }

    // нет открытой скобки, пробуем открыть
    for (let j = 0; j < bracketsConfig.length; j++) {
      if (str[i] === bracketsConfig[j][0]) {
        stack.push(str[i]);
        i++;
        continue next;
      }
    }

    // стек пустой, надо было открыть скобку, но не открыли, т.к. она не совпала ни с одной открывающей
    return false;
  }

  return stack.length === 0;
}
