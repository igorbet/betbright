<!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6 lang-en"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7 lang-en"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8 lang-en"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9 lang-en"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js lang-en"> <!--<![endif]-->
<head>

    <meta charset="utf-8">

    <title>Frontend Developer Test - PHP exercise</title>

    <meta name="viewport" content="initial-scale=1.0, width=device-width">

    <style>
        li { margin-top: 20px; line-height: 1.4; }
        li:first-child { margin-top: 0; }
        li strong { display: block; }
    </style>

    <?php

        function calculates_next_draw( $current_date = 'now' ) {

            $date = new DateTime($current_date, new DateTimeZone('Europe/Dublin'));

            $draw_dates = array(
                'this Wednesday 8PM',
                'this Saturday 8PM',
            );

            foreach ($draw_dates as $d) {

                $next_date = clone $date;
                $next_date->modify($d);

                if($next_date < $date) {
                    continue;
                }

                // echo '<pre>';
                // var_dump($next_date);
                // echo '</pre>';

                // if(!isset($min_date) || $next_date <= $min_date) {
                if(!isset($min_date) || $next_date < $min_date) {
                    $min_date = $next_date;
                }
                // } else {
                //     echo '<pre>';
                //     var_dump($min_date->diff($next_date));
                //     echo '</pre>';
                // }
            }

            return $min_date->format('d-m-Y H:i');
        }

    ?>

</head>

<body>

    <div class="Container">

        <h1>Tests</h1>

        <ul>
            <li>
                <strong>Now</strong>
                <?php echo calculates_next_draw(); ?>
            </li>
            <li>
                <strong>28-02-2017 11:12 (Tuesday)</strong>
                <?php echo calculates_next_draw('28-02-2017 11:12'); ?>
            </li>
            <li>
                <strong>01-03-2017 15:13 (Wednesday)</strong>
                <?php echo calculates_next_draw('01-03-2017 15:13'); ?>
            </li>
            <li>
                <strong>01-03-2017 20:13 (Wednesday)</strong>
                <?php echo calculates_next_draw('01-03-2017 20:13'); ?>
            </li>
            <li>
                <strong>04-03-2017 19:13 (Saturday)</strong>
                <?php echo calculates_next_draw('04-03-2017 19:13'); ?>
            </li>
            <li>
                <strong>04-03-2017 20:13 (Saturday)</strong>
                <?php echo calculates_next_draw('04-03-2017 20:13'); ?>
            </li>
        </ul>

    </div>

</body>
</html>
