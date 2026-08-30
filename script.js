// 1. تغيير خلفية الشاشة بالكامل عند إدراج صورة
const bgInput = document.getElementById('bgInput');

bgInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.body.style.backgroundImage = `url('${e.target.result}')`;
    }
    reader.readAsDataURL(file);
  }
});

// 2. إدارة المواد والوقت
function addSubject() {
  const subjectInput = document.getElementById('subjectInput');
  const timeInput = document.getElementById('timeInput');

  const subject = subjectInput.value.trim();
  const time = parseInt(timeInput.value);

  if (subject === '' || isNaN(time) || time <= 0) {
    alert('يرجى إدخال اسم المادة والوقت بالدقائق بشكل صحيح.');
    return;
  }

  const ul = document.getElementById('subjectList');
  const li = document.createElement('li');

  li.innerHTML = `
    <span><strong>${subject}</strong> (${time} دقيقة)</span>
    <div class="actions">
      <button class="btn-start" onclick="setTimerSubject('${subject}', ${time})">تشغيل</button>
      <button class="btn-delete" onclick="this.parentElement.parentElement.remove()">حذف</button>
    </div>
  `;

  ul.appendChild(li);

  subjectInput.value = '';
  timeInput.value = '';
}

// 3. إدارة العداد التنازلي
let countdown = null;
let totalSeconds = 0;
let initialTime = 0;

function setTimerSubject(subjectName, minutes) {
  clearInterval(countdown);
  document.getElementById('currentSubject').innerText = `المادة الحالية: ${subjectName}`;
  totalSeconds = minutes * 60;
  initialTime = totalSeconds;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  document.getElementById('timerDisplay').innerText = 
    `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (totalSeconds <= 0) return;
  clearInterval(countdown);
  
  countdown = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(countdown);
      alert('انتهى الوقت المخصص لهذه المادة!');
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(countdown);
}

function resetTimer() {
  clearInterval(countdown);
  totalSeconds = initialTime;
  updateTimerDisplay();
}