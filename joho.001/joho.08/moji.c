#include<stdio.h>
/*int main (void){
    char x = 'A';
    char y = 0x41;
    char z = 66;
    char a = 65;
    char b = 00;

    printf("%c",x);
    printf("%c",y);
    printf("%c",z);
}*/

int main (void){
    char a[20];
    a[0]='A';
    a[1]= 0x41;
    a[2]= 66;
    a[3]=65;
    a[4]= 0x00;
    a[5]=0x0D;
    a[6]=0x0A;
    
    for (int i=0;i<7;i++){
        printf("%c",a[i]);
    }
}