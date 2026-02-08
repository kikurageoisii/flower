#include <stdio.h>

int is_upper(char c)
{
    if(('A'<=c)&&(c<='Z')){
      return c+32;
    }else{
    return c;
    }
}

void to_lower(char *str_in)
{
  for(int i=0;i<100;i++){
    str_in[i]= is_upper(str_in[i]);
  }
}

int main()
{
  char str_in[100];
  scanf("%s", str_in);

  to_lower(str_in);
  printf("%s\n", str_in);

  return 0;
}