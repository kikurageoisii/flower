#include <stdio.h>

void times(int* a,int b,int* ans)
{
    *ans=(*a)*(*a)+b*b*b;
}

int main(void)
{
  int a = 0;
  int b = 0;
  scanf("%d %d", &a, &b);
  
  int ans = 0;
  times(&a, b, &ans);
  
  printf("%d\n", ans);
  return 0;
}