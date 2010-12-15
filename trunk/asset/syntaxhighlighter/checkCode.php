<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
 <head>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
     <title>SyntaxHighlighter Build Test Page</title>
 <!--SyntaxHighlighter-->
     <script type="text/javascript" src="scripts/shCore.js"></script>
     <script type="text/javascript" src="scripts/shBrushBash.js"></script>
    <script type="text/javascript" src="scripts/shBrushCpp.js"></script>
     <script type="text/javascript" src="scripts/shBrushCSharp.js"></script>
     <script type="text/javascript" src="scripts/shBrushCss.js"></script>
     <script type="text/javascript" src="scripts/shBrushDelphi.js"></script>
     <script type="text/javascript" src="scripts/shBrushDiff.js"></script>
     <script type="text/javascript" src="scripts/shBrushGroovy.js"></script>
     <script type="text/javascript" src="scripts/shBrushJava.js"></script>
     <script type="text/javascript" src="scripts/shBrushJScript.js"></script>
     <script type="text/javascript" src="scripts/shBrushPhp.js"></script>
     <script type="text/javascript" src="scripts/shBrushPlain.js"></script>
     <script type="text/javascript" src="scripts/shBrushPython.js"></script>
     <script type="text/javascript" src="scripts/shBrushRuby.js"></script>
     <script type="text/javascript" src="scripts/shBrushScala.js"></script>
     <script type="text/javascript" src="scripts/shBrushSql.js"></script>
     <script type="text/javascript" src="scripts/shBrushVb.js"></script>
     <script type="text/javascript" src="scripts/shBrushXml.js"></script>
     <link type="text/css" rel="stylesheet" href="styles/shCore.css"/>
     <link type="text/css" rel="stylesheet" href="styles/shThemeDefault.css"/>
     <script type="text/javascript">
         SyntaxHighlighter.config.clipboardSwf = 'scripts/clipboard.swf';
        SyntaxHighlighter.all();
     </script>
     </head>
 <body>
     <div id="content">
     <?
     echo stripslashes($_POST['textarea']); //去除转义符（因为 PHP 会自动转义）
     ?>
    </div>
</body>
</html>