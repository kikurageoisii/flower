#include <stdio.h>

int calc_value(char s[])
{
  int ans=s[0]-'0';
  int kazu=0;
  for(int i=2;s[i]!='\0';i+=2){
    kazu=s[i]-'0'; //数字から英語へ
    switch (s[i-1]){
     case '+':
     ans+=kazu;
     break;
     
     case '-':
     ans-=kazu;
     break;
    }
}
  return ans;
}

int main(void)
{
  const int N = 100;
  char str[N+1];
  scanf("%s", str);

  int ans = 0;

  ans = calc_value(str);

  printf("%d\n", ans);
  return 0;
}