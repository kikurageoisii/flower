#include<iostream>
using namespace std;
int main (void){
    int N,X,a=0;
    cin>>N>>X;
    int numbers[N];
    for(int i=0;i<N;i++){
    cin>>numbers[i];
    if(numbers[i]==X){
        a=1;
        break;
}}
       if(a==0){
        cout<<"No"<<endl;
       }else{
        cout<<"Yes"<<endl;
       }

}