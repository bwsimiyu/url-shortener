export const copyToClipboard = (value: string) => {
  const temp = document.createElement('textarea');
  temp.style.position = 'fixed';
  temp.style.left = '0';
  temp.style.top = '0';
  temp.style.opacity = '0';
  temp.value = value;
  document.body.appendChild(temp);
  temp.focus();
  temp.select();
  document.execCommand('copy');
  alert('Link Coppied');
}