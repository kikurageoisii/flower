#include <stdio.h>

int is_upper(int c)
{

  /*if(('A'<=c)&&(c<='Z')){ //'c'ではcを確認してしまう。
    return 1;
  }else{
    return 0; 
  }
  */
 return ('A'<=c)&&(c<='Z'); //で十分 ifはいらない
}

int is_lower(int c)
{
  if(('a'<=c)&&(c<='z')){
    return 1;
  }else{
    return 0;
  }
}
int is_number(int c)
{
if( ('0'<=c)&&(c<='9')){
    return 1;
  }else{
    return 0;
  }
}


int main()
{
  char c;
  scanf("%c", &c);
  if (is_upper(c))
    printf("upper\n");
  else if (is_lower(c))
    printf("lower\n");
  else if (is_number(c))
    printf("number\n");
  else
    printf("others\n");
  return 0;
}