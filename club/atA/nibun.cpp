#include <iostream>
//<vector>を使う
#include <vector>
using namespace std;

//vectorの使い方注意
int nibun(int n,int x,const vector<int> &a){
    int ans=0;
    int mid=0;
    //以下の２行で配列とのずれを修正
    int left=0;
    int right=n-1;
        
    
    do{
        ans = left + (right - left)/2;
        if(a[ans]==x){
           ans = ans +1;
           break; 
        }else if(a[ans]>x){
            right=ans-1;
        }else{
            left=ans+1;
        }
    }while(right>=left);
    return(ans);
}

int main (void){
    int n=0, x=0;
    cin>>n>>x;
    vector<int> a(n);
    int ans=0;
    

    for(int i=0;i<n;i++){
        cin>>a[i];
    }

    cout<<nibun(n,x,a);
}