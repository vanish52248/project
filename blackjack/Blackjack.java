import java.util.*;


public class Blackjack {
    public static void main(String[] args) {
        /*
         * 開始用メソッド
         */
        Scanner sc = new Scanner(System.in);
        System.out.println("ゲームを開始しますか。 y: yes / それ以外: no");
        String init = sc.next();
        if (init.equals("y")) {
            // ゲームの開始
            Start.initGame();
        } else {
            sc.close();
            return;
        }
        sc.close();
    }
}
