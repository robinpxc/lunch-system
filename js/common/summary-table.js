let orderCollection = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // index 0-6是办到物业，最后一个是没点的人数

function collectOrderSum(data) {
  for(let i = 0; i < data.length; i++) {
    let orderNum = data[i][2];
    if(orderNum > 0 && orderNum < 6) {
      orderCollection[orderNum]++;
    }
  }
}