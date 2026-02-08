#include <stdio.h>

//int型の配列scanf
void yomu_int(int array[],int size){
    for(int i=0;i<size;i++){
        scanf("%d",&array[i]);
    }
}

void kazu_scan(int array[],int N){
     int i=0;
    while(scanf("%d",&array[i])==1&&i<N){
        i++;
    }
    //array[i]='\0';   
}


//int型の配列printf


//double型の配列
// scan_double(array,size);
void scan_double(double array[],int size){
    for(int i=0;i<size;i++){
        scanf("%lf",&array[i]);
    }

}

//double型の配列printf
void printf_int(double array[],int size){
    for(int i=0;i<size;i++){
        printf("%.2f ",array[i]);
    }
    printf("\n");

}



//char型の配列
/*
scanf("%s",array);
printf("s",array);
*/

//a~bまでの和
int sum(int a,int b){
    return (a+b)*(b-a+1)/2;
}

//1*1~a*bまでの掛け算の表を表示
void onekakezan_hyou(int a,int b){
    for(int i=1;i<=a;i++){
        for(int j=1;j<=b;j++){
            printf("%d ",j*i);
        }
        printf("\n");
    }
}

//yoko1*tate1 yoko1+1*tate1,,,と掛け算の表を作る
void kakezan_hyou(int yoko1,int tate1,int yoko2,int tate2, int keta){
    for(int i=tate1;i<=tate2;i++){
        for(int j=yoko1;j<=yoko2;j++){
            printf("%*d ",keta,j*i);
        }
        printf("\n");
    }
}

//配列の掛け算表
void hairetu_kakezan_hyou(int yoko[],int tate[],int size){
    for(int i=0;i<size;i++){
        for(int j=0;j<size;j++){
            printf("%3d ",yoko[i]*tate[j]);
        }
        printf("\n");
    }
}

//平均を求める　double型に注意
double heikin(double array[],int size){
    double ans=0.0;
    for(int i=0;i<size;i++){
        ans+=array[i];
    }
    return ans/size;
}

//1~Nまでの二乗和
int jijouwa(int n){
    int ans=0;
    for(int i=1;i<=n;i++){
        ans+=i*i;
    }
    return ans;
}

//素数判定　素数なら１　合成数なら０
int sosu(int x) {
    if(x<=2) return 1;
    for(int i=2;i<x;i++){
        if(x%i==0) return 0;
    }
    return 1;
}

//君の名は
//kiminonawa(array,n);
void kiminonawa(int A[], int N){
    int * a=&A[0];
    int * b=&A[1];
    int * c=&A[2];
    
    switch(N){
        
        case 1:
        { //{}が必要
        int temp= *a;
        *a=*b;
        *b=temp;
        break;
        }  
        
        case 2:
        {
        int temp=*b;
        *b=*c;
        *c=temp;
        break; 
        }
        
        case 3:
        {
        int temp=*a;
        *a=*c;
        *c=temp;
        break;
        }
    }
}

//距離を求める関数
#include<math.h>
double kyori(double a=0.0,double b=0.0,double c=0.0){
    return sqrt(a*a+b*b+c*c);
}

//再帰関数　フィボナッチ
int fibonacci(int n)
{
    if(n == 0){ 
        return 0;
    }
    if(n == 1){
        return 1;
    }
    return fibonacci(n-2)+fibonacci(n-1); 
}

//n次元の内積
//naiseki(array1,array2,n);
double naiseki(double a[],double b[], int n){
    double ans=0.0;
    for(int i=0;i<n;i++){
        ans+=a[i]*b[i];
    }
    return ans;
}

//配列の成分を二乗する
//pow_array(date,N);
void pow_array(int date[],int N)
{
    for(int i=0;i<N;i++){
        date[i]=date[i]*date[i];
    }
}

//小さい順に並び替え
void tiisaijun(int array[],int size){
    for(int j=0;j<size-1;j++){
        for(int i=0;i<size-j-1;i++){
            if(array[i]>array[i+1]){
                int temp = array[i];
                array[i]=array[i+1];
                array[i+1]=temp;
                }
        }
    }
}

//大きい順に並び替え
int main(){}

//シーザー暗号。
char* caesar(char str_in[],char str_out[],int key)
{
    key%=26;
    if(key>0)key-=26;
    int i=0;
    while(str_in[i]!='\0'&&i<100){
        str_out[i]=str_in[i]+key;
        //printf("%c",str_out[i]);
        if(str_out[i]<'a')str_out[i]+=26;
        //printf("%c",str_out[i]);
        i++;
    }
    return str_out;//アドレスを返している
}

//和と差を求める　１桁
int sisoku(char array[]){
    int ans=array[0]-'0';
    //printf("%d",ans);
    for(int i=1;array[i]!='\0';i++){
        switch (array[i]){
            case '+':{
                i++;
                ans+=array[i]-'0';
                break;
            } 
            case '-':{
                i++;
                ans-=array[i]-'0';
                break;
            }   
            
        }
    }
    return ans;
}

//和と差を求める　改良版
int sisoku(char array[]) {
    int ans = 0;
    int i = 0;
    int sign = 1;  // +1 for positive, -1 for negative

    while (array[i] != '\0') {
        int num = 0;

        // Read the number
        while (array[i] >= '0' && array[i] <= '9') {
            num = num * 10 + (array[i] - '0');
            i++;
        }

        // Apply the sign
        ans += sign * num;

        // Read the operator
        if (array[i] == '+') {
            sign = 1;
        } else if (array[i] == '-') {
            sign = -1;
        }
        i++;
    }
    return ans;
}

//大文字を小文字に変換する
void oomojiwokomojini(char array[]){
    
    for(int i=0;array[i]!='\0';i++){
        if('A'<=array[i]&&array[i]<='Z'){
            array[i]=array[i]-'A'+'a';
        }
    }
}

//文字種
int is_upper(char c)
{
    if('A'<=c&&c<='Z') return 1;
    else return 0;
}
int is_lower(char c)
{
    if('a'<=c&&c<='z') return 1;
    else return 0;
}
int is_number(char c)
{
    if('0'<=c&&c<='9') return 1;
    else return 0;
}

//多次元配列の読み取り
//int table[][];
//scan_table(table[0])
void scan_table(int *table, int size) {//ポインターを引数として与える
    for(int i=0; i<size; i++) {
        scanf("%d",&table[i]);
    }
}

//配列で探し物
/*
int table[R][C];
    scan_table(table[0]);  // 先頭アドレスを渡している
    int *p = table[0];  // ポインタを先頭アドレスに合わせる
    printf("%d\n", search_table(p));  // 結果の出力
*/
int search_table(int *p,int size) {//ポインターを引数として与える
    int count = 0;
    while(*p==0){
        count++;
        p++;//ポインタをインクリメント
        if(count==size-1)break;//無限ループを回避
    }
    return count;
}

//文字列で探し物
//seek_char(c,array);
char* seek_char(char c,char* str) 
{   
    int i=0;
    for(;str[i]!=c;i++){
        if(str[i]=='\0')return &str[0];//見つからなかった時用
    }
    return &str[i];//アドレスを返す
}

//テキストファイルの中の文字列を読み取る
/*
    char file[10]="input.txt";
    char str[N+1];
    file_scan(file,str)
*/


void file_scan(const char file[],char str[]){
    FILE* ipfp=fopen(file,"r");
    if(ipfp==NULL) return;
    fscanf(ipfp,"%[^\n]",str);
    fclose(ipfp);
}

//テキストファイルの中に文字列を書き込む
//file_print(ファイルのラベル,書き込む文字列のラベル);
void file_print_char(const char file[],char str[]){
    FILE* opfp=fopen(file,"w");
    if(opfp==NULL) return;
    fprintf(opfp,"%s",str);
    fclose(opfp);
}

//csvファイルの読み取り
void csv_scan(const char file[],int array[],int size){
    FILE* ipfp=fopen(file,"r");
    
    if(ipfp==NULL) return;
    
    for (int i = 0; i < size; i++)
    {
        if(fscanf(ipfp,"%d,",&array[i])!=1)break;
    }

    fclose(ipfp);
}

//ファイルに文字を入力
//使い方　csv_scan("50date.txt",&a[0],N);
void file_print_int(const char file[],int array[],int size){
    FILE* opfp=fopen(file,"w");
    
    if(opfp==NULL) return;
    
    for(int i=0;i<size;i++){
        if(array[i]<60)fprintf(opfp,"ng ");
        else fprintf(opfp,"ok ");
    }
    fclose(opfp);
}

//文章を単語に分割
void split_sentence(char *p){ //文章の先頭アドレス
    while(*p){
        if(*p==' ')printf("\n");
        else printf("%c",*p);
        p++;
    }
}

//単語を辞書順に並び替え
#include<string.h>
void sortWords(char * array[],const int size) {

    for(int j=0;j<size-1;j++){
        for(int i=0;i<size-j-1;i++){
            if(strcmp(array[i],array[i+1])>0){
                char* temp = array[i];
                array[i]=array[i+1];
                array[i+1]=temp;
                }
        }
    
    }
}

//float型で最大値を見つける
float max(float c[],const int N){
    float max=c[0];
    
    for(int i=1;i<N;i++){
        if(max<c[i])max=c[i];
    }
    return max;
}

//float型で最小値を見つける
float mini(float c[],const int N){
    float mini=c[0];
     for(int i=1;i<N;i++){
        if(mini>c[i])mini=c[i];
    }
    return mini;
}

//float型で平均をとる
float ave(float c[],const int N){
    float sum=0;
    for(int i=0;i<N;i++){
        sum+=c[i];
    }
    return sum/N;
}

//float型で標準偏差を求める
float hyoujunnhensaint (float array[],int n){
    
    const double hei = ave(array,n); //引数の宣言の仕方注意 
    double sum=0.0;
    for(int i=0;i<n;i++){
        sum+=(hei-array[i])*(hei-array[i]);
    }
    return sqrt(sum/n);
}

//約数の個数
int yaku(int x){
    int ans=0;
    for(int i=1;i<=x;i++){
        if(x%i==0)ans++;
    }
    return ans;
}

//中央値を返す
//tiisaijunを使用
double tyuuouti(int array[],int size){
    tiisaijun(array,size);
    if(size%2==0){
        return (double)(array[size/2]+array[size/2-1])/2;
    }else{
        return array[size/2];
    }
}

//階乗
int kaijou(int n){
    if(n<=1) return 1;
    return kaijou(n-1)*n;
}

//与えられた文字列を逆に出力する
//スペースがあるとうまくいかない
void gyaku(char a[],int N){
    int i=0;
    while(scanf("%c",&a[i])==1&&a[i]!='\n'&&i<N){
        i++;
    }
    a[i]='\0';

    for(int j=i-1;0<=j;j--){
        printf("%c",a[j]);
    }
    printf("\n");
}

//文字を1個ずつscan
void moji_1_scan(char array[],int N){
     int i=0;
    while(scanf("%c",&array[i])==1&&array[i]!='\n'&&i<N){
        i++;
    }
    array[i]='\0';   
}

//二分探査
int nibun(int a[],int target,int left,int right){
    
    
    while(left<=right){
        int mid=(right-left)/2+left;
        if(target==a[mid]){
            return mid+1;
        }else if(a[mid]<target){
            left=mid+1;
        }else{
            right=mid-1;
        }
   
    }
    return -1;
}

//二次元配列のscan
void niji_scan(int *array,const int M,const int N){
    for(int i=0;i<M;i++){
        for(int j=0;j<N;j++){
            scanf("%d",array);
            array++;
        }
    }
}


//二次元配列のprint 
//pniji(&a[0][0],N,M);
void pniji(int *array,const int M,const int N){
     for(int i=0;i<M;i++){
        for(int j=0;j<N;j++){
            printf("%4d ",*array);//4は変えられる
            array++;
        }
        printf("\n");
    }
}

//転置
//tenti(&a[0][0],M,N)
int* tenti(int *array,const int M,const int N){
    int *ans=(int*)malloc(sizeof(int)*N*M);
    for(int i=0;i<N;i++){
        for(int j=0;j<M;j++){
            ans[i * M + j] = array[j * N + i];
        }
    }
    return ans;
}

//２進数で表示
void nisinnsuu(int n){
    const int N=10;
    int a[N]={0};
    int i=0;
    
    while (n > 0 && i < N) {
        a[i] = n % 2;
        n /= 2;
        i++;
    }

   for(int j=N-1;0<=j;j--){
        printf("%d",a[j]);
    }
    printf("\n");
}