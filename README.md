![Logo](https://scspace-public.s3.ap-northeast-2.amazonaws.com/%EB%A1%9C%EA%B3%A0(%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C).png)

# GONGGAN
General Open Nomination for Guestspace & Granular Access Network

학생문화공간위원회에서 운영하는 공간의 예약 시스템입니다. https://scspace.kaist.ac.kr

본 레포는 머리털 나고 처음으로 자바스크립트 코딩한 공간위 8, 9기의 비극을 담고 있습니다.

## 기능
- 예약 신청, 조회(공간 또는 개인 단위), 취소 및 변경
- 예약 단위(팀, 사용자)의 생성 및 관리
- 공간위 공지사항 표시 및 관리
- FAQ, 공간 정보 표시
- 공간위 연락 수단(contact, ticket)

## 빌드시 참고사항
본 레포에는 회칙을 비롯한 일부 문서가 포함되어 있지 않습니다. 이와 더불어 일부 하드링크가 존재할 수 있습니다.

## 보안 문제, 버그 신고
버그가 발견되었을 경우 issue 제기 후 **반드시** 공간위 공식 창구(이메일 : scspace@카이스트 주소)로 연락해주세요.

## 개발시 주의사항
- *매뉴얼 정독*
- 비밀번호, API Key 등 secret을 **절대** 평문으로 코드에 적지 마세요.
- 필수 기능(로그인, 예약)이 계속 작동할 수 있게 기능을 PR로 넣어주세요.
- 본 레포의 master는 production과 동일해야 합니다. **절대 백엔드에만 손대지 마세요.**
- 회칙, 세칙 수정시 **같은 파일명으로 S3 버킷에 올려서** 교체하세요

### 배포 후 수정 방법
1. 기능을 위한 branch를 fork하거나, dev 브랜치로 전환한다.
2. 로컬에서 개발한다.
3. CI/CD 통과 확인 후 master에 PR을 날린다.
4. **다른 사람이** 문제 없는지 확인 후 Merge한다.
5. 서버에 git pull한다. (벡엔드 한정, 프런트는 자동으로 됨)
