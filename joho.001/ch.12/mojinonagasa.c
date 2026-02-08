#include<stdio.h>
#include<string.h> //for strlen(str);

int main(void){
    
    FILE* ipp=fopen("input.txt","r");//ifp=stdin;//でデバック
    FILE* opp=fopen("output.csv","w");//opp=stdout;//でデバック
    
    const int N=50;
    char str[N+1];
    
    while(fscanf(ipp,"%s",str)!=EOF){ //freadはbinary
        //fprintf(opp,"%s\n",str);//(opp,"%d ",str[i])  
       

        /*スペースが読み取れない
        int i=0;
        for(i=0;i<N+1;i++){
            if(str[0]=='\0') fprintf(opp,"%d,",0);
            if(str[i]=='\0')break;
        }
        */

        int word_length=strlen(str);
        fprintf(opp,"%d,",word_length);
    }
        
    
    fclose(ipp);
    fclose(opp);//opp=stdoutならいらない

}