@echo On
@Rem ɾ��CVS�汾����Ŀ¼
@PROMPT [Com]#

@for /r . %%a in (.) do @if exist "%%a\CVS" RD /s/Q "%%a\CVS"

@echo Mission Completed.
@pause
