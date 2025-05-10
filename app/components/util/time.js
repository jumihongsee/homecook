export function Time(dateInput) {
  const date = new Date(dateInput);
  const diff = (Date.now() - date.getTime()) / 1000;

  if (isNaN(diff) || diff < 0) return '방금 전';

  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;

  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
