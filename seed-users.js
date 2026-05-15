//hadi a bb bach ncreeiw users fl database w ndehashiw l password wkda 
const bcrypt = require('bcrypt');
const { Client } = require('pg');

const client = new Client({
  host: 'aws-0-eu-west-1.pooler.supabase.com',
    port: 5432,
      user: 'postgres.qpkuiisrnorrpujvvdzz',
        password: 'eNsIyYBhjruIlWMI',
          database: 'postgres',
            ssl: { rejectUnauthorized: false },
            });

            const users = [
              {
                  username: 'sarah_rh',
                      email: 'sarah@sgrh.ma',
                          password: 'Sarah2026rh!',
                              role_id: 2, // rh
                                },
                                  {
                                      username: 'karim_chef',
                                          email: 'karim@sgrh.ma',
                                              password: 'Karim2026chef!',
                                                  role_id: 4, // manager / chef d'équipe
                                                    },
                                                    ];

                                                    async function seed() {
                                                      await client.connect();
                                                        console.log('Connected to Supabase\n');

                                                          for (const u of users) {
                                                              const hash = await bcrypt.hash(u.password, 12);
                                                                  const res = await client.query(
                                                                        `INSERT INTO utilisateurs (username, email, password_hash, role_id, is_actif)
                                                                               VALUES ($1, $2, $3, $4, true)
                                                                                      ON CONFLICT (username) DO UPDATE
                                                                                               SET password_hash = EXCLUDED.password_hash,
                                                                                                            email = EXCLUDED.email,
                                                                                                                         role_id = EXCLUDED.role_id,
                                                                                                                                      is_actif = true,
                                                                                                                                                   tentatives_connexion = 0,
                                                                                                                                                                verrouille_jusqu = NULL
                                                                                                                                                                       RETURNING id, username, email, role_id, is_actif`,
                                                                                                                                                                             [u.username, u.email, hash, u.role_id]
                                                                                                                                                                                 );
                                                                                                                                                                                     console.log(`✅ ${u.username} (role_id=${u.role_id}) → ${res.rows[0].id}`);
                                                                                                                                                                                         console.log(`   password: ${u.password}\n`);
                                                                                                                                                                                           }

                                                                                                                                                                                             await client.end();
                                                                                                                                                                                               console.log('Done!');
                                                                                                                                                                                               }

                                                                                                                                                                                               seed().catch(console.error);
                                                                                                                                                                                               