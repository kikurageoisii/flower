#include <iostream>
using namespace std;
int main (void){
    int n,q;
    cin>>n>>q;

    int guests[n],sum[n];
    int L[q],R[q];
    
    
for(int j=0;j<n;j++){
    cin>>guests[j];
    if(j==0){
        sum[j]=guests[j];
    }else{
    sum[j]=sum[j-1]+guests[j];
    }
    }
    
    for(int i=0;i<q;i++){
        cin>>L[i]>>R[i];
    }

    for(int d=0;d<q;d++){
        cout<<sum[R[d]-1]-((L[d]>1)?sum[L[d]-2]:0)<<endl;
    
    }
 }