#include <iostream>
#include <vector>
using namespace std;

//紙の数を求めて　nibun　に生かす。
int kaminokazu(int byou,int n,const vector<int> &a){
    int kami_wa=0;
    for(int i=0;i<n;i++)
    kami_wa+=byou/a[i];
    return kami_wa;
}

//二分法によって秒を求めたい。
int nibun(int k,const vector<int> &a,int n){
    int left=0,right=n-1;
    int byou;
    while(right>=left){
        byou=left+(right-left)/2;
        if(kaminokazu(byou,n,a)==k){
            break;
        }else if(kaminokazu(byou,n,a)>=k){
            right=byou-1;
        }else{
            left=byou+1;
        }
    }  
return(byou);
}


int main (void){
    int n=0,k=0;
    cin>>n>>k;
    vector<int> a(n);
    for(int i=0;i<n;i++){
        cin>>a[i];
    }
    cout<<nibun(k,a,n)<<endl;

}