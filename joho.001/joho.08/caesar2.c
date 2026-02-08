#include<stdio.h>

int mod(int k){
    k%=26;
    if(k<0){
        k+=26;
    }
    return k;
}

char taiou(char c){
   /* hまで上手くいく
   while(26<c){
    c-=26;
   } 
   c=c+'a'-'a'%26; 
   */
    switch(c%26){
    case ('a'%26):
    c='a';
    break;
    case ('b'%26):
    c='b';
    break;
    case ('c'%26):
    c='c';
    break;
    case ('d'%26):
    c='d';
    break;
    case ('e'%26):
    c='e';
    break;
    case ('f'%26):
    c='f';
    break;
    case ('g'%26):
    c='g';
    break;
    case ('h'%26):
    c='h';
    break;
    case ('i'%26):
    c='i';
    break;
    case ('j'%26):    
    c='j';
    break;
    case ('k'%26):
    c='k';
    break;
    case ('l'%26):
    c='l';
    break;    
    case ('m'%26):
    c='m';
    break;    
    case ('n'%26):
    c='n';
    break;    
    case ('o'%26):
    c='o';
    break;    
    case ('p'%26):
    c='p';
    break;    
    case ('q'%26):
    c='q';
    break;    
    case ('r'%26):
    c='r';
    break;    
    case ('s'%26):
    c='s';
    break;    
    case ('t'%26):
    c='t';
    break;    
    case ('u'%26):
    c='u';
    break;    
    case ('v'%26):
    c='v';
    break;    
    case ('w'%26):
    c='w';
    break;    
    case ('x'%26):
    c='x';
    break;    
    case ('y'%26):
    c='y';
    break;    
    case ('z'%26):
    c='z';    
    break;
    }
    return c;
   
  
}
    
 

int main(void){
    int N=100,k=0;
    char word[N];
    //word[i]%26
    for(int i=0;i<N;i++){
         scanf("%c",&word[i]);
         if(word[i]==' ')break;
         word[i]%=26;
    }
    scanf("%d",&k);
  
    for(int i=0;i<N;i++){
        if(word[i]==' ')break;
        word[i]+=mod(k);
         printf("%c",taiou(word[i]));
       
    }
        printf("\n");
    /*for(int i=0;i<N;i++){
        if(word[i]==' ')break;
        printf("%d",(int)taiou(word[i]));
    }
    */
    //printf("\n");
} 


//abcdefghijklmnopqrstuvwxyz