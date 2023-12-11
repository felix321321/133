const lottoDiv = document.getElementById("lotto")
const bonusDiv = document.getElementById("zusatz")
let lottoNumbers = []
const zusatzZahl = generateBonusNumber()   


    for (let i = 0; i < 6; i++) {
        let randomNumber = getRandom(1, 42);
        if (!lottoNumbers.includes(randomNumber)) {
            lottoNumbers.push(randomNumber);
        } else {
            i--;
        }
    }


function generateBonusNumber() {
    return getRandom(1, 6)
}

function getRandom(min, max) {
    const floatRandom = Math.random()
  
    const difference = max - min
  
    // random between 0 and the difference
    const random = Math.round(difference * floatRandom)
  
    const randomWithinRange = random + min
  
    return randomWithinRange
  }


  console.log(lottoNumbers)

  let lottoString = '';
  for (let i = 0; i < lottoNumbers.length; i++) {
      lottoString += '<li>' + lottoNumbers[i] + '</li>';
  }
  lottoDiv.innerHTML = lottoString;
  bonusDiv.innerHTML = '<li>' + zusatzZahl + '</li>';