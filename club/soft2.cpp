#include <iostream>
using namespace std;

int main(void){
    int n=0;
    cin>>n;
    int S[n];
    for(int i=0;i<n;i++){
        cin>>S[i];
    }
    int k=0;
    cin>>k;
    cout<<S[k]<<endl;
    
    int l=0;
    cin>>l;
    for(int i=0;i<n;i++){
        if(S[i]=l){
            cout<<S[i]<<" ";
        }

    }



}