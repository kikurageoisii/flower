#include <iostream>
using namespace std;

void read_letters(int n,char letters[]){
    for(int i=0;i<n;i++){
        cin>>letters[i];
    }
}

int main(void){
    int n=0;
    cin>>n;
    char s[n],t[n];
    read_letters(n,s);
    read_letters(n,t);
    for(int i=0;i<n;i++){
        if(s[i]==t[i]){
            cout<<i;
        }
    }
}