function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " năm";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " tháng";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " ngày";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " giờ";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " phút";
  }
  return Math.floor(seconds) + " giây";
}

module.exports = timeSince;