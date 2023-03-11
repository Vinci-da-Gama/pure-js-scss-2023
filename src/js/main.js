$(() => {
  console.log('2 -- jquery console.log')
})

////////////// presentation_question
const n = 4;
const scheduleStart = [1, 1, 2, 3];
const scheduleEnd = [2, 3, 3, 4];

function maxPresentations(n, scheduleStart, scheduleEnd) {
  // Combine the start and end times into an array of time slots
  /* const timeSlots = [];
  for (let i = 0; i < n; i++) {
    timeSlots.push({ start: scheduleStart[i], end: scheduleEnd[i] });
  } */
  const timeSlots = scheduleStart.map((start, i) => ({ start, end: scheduleEnd[i] }));

  // Sort the time slots by their end times
  timeSlots.sort((a, b) => a.end - b.end);

  let maxPresentations = 0;
  let lastEndTime = 0;
  console.log('18 -- maxPresentations -- timeSlots: ', timeSlots)

  // Iterate through the sorted time slots and count the number of non-overlapping presentations
  for (let i = 0; i < n; i++) {
    const { start, end } = timeSlots[i];
    if (start >= lastEndTime) {
      maxPresentations++;
      lastEndTime = end;
    }
  }

  return maxPresentations;
}


const maxPresentationsAttended = maxPresentations(n, scheduleStart, scheduleEnd);
console.log('39 -- result: ', maxPresentationsAttended);
////////////// END presentation_question
